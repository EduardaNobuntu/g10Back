import path from 'path';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import PdfRepository from "../repository/pdf.repository";
//TODO: Importa o modelo de PDF

export async function gerarPDF(arrayPerguntas: any[], nomeEnquete: string, idEnquete: string, outputFileName: string) {
  console.log('Gerando PDF...');

  // Crie um novo documento jsPDF
  const doc = new jsPDF();

  // Defina a margem e outras configurações do documento
  const margin = 30;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Defina a posição inicial do conteúdo
  let currentY = margin;

  // Adicione o título do relatório
  doc.setFontSize(24);
  doc.text(`Relatório ${nomeEnquete}`, pageWidth / 2, currentY, { align: 'center' });
  currentY += 10; // Aumente a posição Y

  // Itere sobre cada pergunta no array
  arrayPerguntas.forEach(result => {
    if (result) {
      const descPerg = result.descricao;
      const respostas = result.respostas;

      // Adicione a descrição da pergunta como cabeçalho da seção
      doc.setFontSize(16);
      doc.text(`Categoria: ${descPerg}`, pageWidth / 2, currentY, { align: 'center' });
      currentY += 10; // Aumente a posição Y

      // Inicialize os totais
      let totalEntrevistado = 0;
      let totalEntrevistador = 0;
      let totalCount = 0;
      let totalPeso = 0;

      // Itere sobre cada resposta para calcular os totais
      respostas.forEach((answer: { countEntrevistado: string; countEntrevistador: string; count: string; countPeso: string; }) => {
        totalEntrevistado += parseInt(answer.countEntrevistado);
        totalEntrevistador += parseInt(answer.countEntrevistador);
        totalCount += parseInt(answer.count);
        totalPeso += parseFloat(answer.countPeso);
      });

      // Crie os dados da tabela
      const tableData = respostas.map((answer: { answer: any; countEntrevistado: { toString: () => any; }; countEntrevistador: { toString: () => any; }; count: { toString: () => any; }; countPeso: number; }) => {
        return [answer.answer, answer.countEntrevistado.toString(), answer.countEntrevistador.toString(), answer.count.toString(), answer.countPeso.toFixed(2).replace('.', ',')];
      });

      // Adicione a tabela ao documento
      ( doc as any).autoTable({
        head: [['Resposta', result.nameEntrevistado, result.nameEntrevistador, 'Total', 'Total %']],
        body: tableData,
        startY: currentY,
        theme: 'grid',
        margin: { top: margin },
        styles: { overflow: 'linebreak' }
      });

      // Adicione uma linha extra com os totais ao final da tabela
      ( doc as any).autoTable({
        head: [['Total', totalEntrevistado.toString(), totalEntrevistador.toString(), totalCount.toString(), totalPeso.toFixed(2).replace('.', ',')]],
        startY: ( doc as any).autoTable.previous.finalY,
        theme: 'grid',
        margin: { top: margin },
        styles: { fontStyle: 'bold' }
      });

      // Ajuste a posição Y para o próximo conteúdo
      currentY = ( doc as any).autoTable.previous.finalY + 20;
    }
  });

  const savedPDFIds = [];
  const pdfContent = doc.output('arraybuffer');
  //TODO: Salve o PDF no banco de dados
  try {
    const pdfRepository = new PdfRepository("mongodb", "Pdf"); // Initialize the PDF repository
    const newPDF = ({
      enquete: idEnquete,  
      fileName: `${outputFileName}_${nomeEnquete}.pdf`,
      fileContent: Buffer.from(pdfContent),
      descricao: 'Relatório de todas as categorias'
    });
    const savedPDF = await pdfRepository.create(newPDF);
    savedPDFIds.push(savedPDF.id); // Armazena o ID do PDF salvo
    console.log(`PDF salvo no banco de dados: ${newPDF.fileName}`);
  } catch (error) {
    console.error('Erro ao salvar PDF no banco de dados:', error);
    throw error;
  }

  // Salve o PDF em um arquivo
  const pastaPDFs = path.join(__dirname, '.', 'pdfs');
  const pdfPath = path.join(pastaPDFs, `${outputFileName}.pdf`);
  doc.save(pdfPath);

  return { pdfPath, pdfId: savedPDFIds };
}

module.exports = { gerarPDF };
