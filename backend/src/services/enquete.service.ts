import { DbType } from "../adapters/createDb.adapter";
import { Enquete } from "../models/enquete.model";
import { Pergunta } from "../models/pergunta.model";
import EnqueteRepository from "../repository/enquete.repository";
import BaseService from "./base.service";
import { PdfService } from "./pdf.service";
import { PerguntaService } from "./pergunta.service";
import { DemograficaService } from "./demografica.service";
import { TransmissaoService } from "./transmissao.service";
import path from 'path';

export class EnqueteService extends BaseService<Enquete> {

  dbType: DbType;
  model: any;
  repository: EnqueteRepository;
  perguntaService!: PerguntaService;
  transmissaoService!: TransmissaoService;
  demograficaService!: DemograficaService;
  pdfService!: PdfService;

  constructor(dbType: DbType, model: any) {
    //Cria o repositório com dados para obter o banco de dados
    var _repository: EnqueteRepository = new EnqueteRepository(dbType, model);
    super(_repository, dbType, model);
    this.repository = _repository;
    this.dbType = dbType;
    this.model = model;
  }

  async findOneAggregateDemografica(id: string) {
    return this.repository.findOneAggregateDemografica(id);
  }

  async createPergunta(id: string, data: any) {
    const pergunta = {
      codigoPergunta: data.codigoPergunta,
      descricao: data.descricao,
      tipoPergunta: data.tipoPergunta,
      obrigatoria: data.obrigatoria,
      bloco: data.bloco,
      outro: data.outro,
      alternativa: data.alternativa,
      resposta: data.resposta
    }

    const perg = this.perguntaService.create(pergunta);

    return this.repository.createPergunta(id, { perguntas: perg });
  }

  async createTransmissao(id: string, data: any) {
    const transmissao = {
      nome: data.nome,
      assunto: data.assunto,
      mensagem: data.mensagem,
      emailRemetente: data.emailRemetente,
      emailSenha: data.emailSenha,
    }

    const transmi = this.transmissaoService.create(transmissao);

    return this.repository.createTransmissao(id, { transmissao: transmi });
  }

  async createDemografica(id: string, data: any) {
    const demografica = ({
      codPergDemografica: data.codPergDemografica,
      descPergDemografica: data.descPergDemografica,
      tipoPergDemografica: data.tipoPergDemografica,
      perguntaNoRelatorio: data.perguntaNoRelatorio,
      respostaPergDemografica: data.respostaPergDemografica,
      alternativaPergDemografica: data.alternativaPergDemografica,
    });

    const demo = this.demograficaService.create(demografica);

    return this.repository.createDemografica(id, { transmissao: demo });
  }

  async getPDF() {

  }

  async relatorioCategorias(id: string) {
    try {
      const enquete = await this.repository.findById(id);
      if (!enquete) {
        console.log('Enquete não encontrada');
        return null;
      }

      const arrayPerguntas: Pergunta[] = [];
      const nameEntrevistado = enquete.nameEntrevistado;
      const nameEntrevistador = enquete.nameEntrevistador;
      const pesoEntrevistado = enquete.pesoEntrevistado;
      const pesoEntrevistador = enquete.pesoEntrevistador;
      const numResp = enquete.numResposta;

      const promises = enquete.pergunta?.map(async (perguntaId) => {
        if (perguntaId) {
          const resultado = await this.repository.gerarAggregateCategorias(perguntaId, nameEntrevistado!, nameEntrevistador!, pesoEntrevistado!, pesoEntrevistador!, numResp!);
          arrayPerguntas.push(resultado as Pergunta);
        }
      }) || [];

      await Promise.all(promises);

      // Ordenar o array pelo campo 'codigo'
      arrayPerguntas.sort((a, b) => a.codigoPergunta! - b.codigoPergunta!);

      // Gerar o PDF e obter o fileName e pdfIds
      const { pdfPath, pdfId } = await this.pdfService.gerarPdf(arrayPerguntas, enquete.nome!, id, 'relatorioCategorias');

      console.log(`PDF gerado com sucesso: ${pdfPath}`);

      // Enviar resposta com array de perguntas, nome do arquivo e IDs dos PDFs salvos
      return ({ arrayPerguntas, fileName: path.basename(pdfPath), pdfId });


    } catch (e) {
      console.log(e);
      return null;
    }

  }

  async relatorioAllRespostas(id: string) {
    try {
      const enquete = await this.repository.findById(id);
      if (!enquete) {
        console.log('Enquete não encontrada');
        return null;
      }

      const arrayPerguntas: Pergunta[] = [];
      const nameEntrevistado = enquete.nameEntrevistado;
      const nameEntrevistador = enquete.nameEntrevistador;
      const pesoEntrevistado = enquete.pesoEntrevistado;
      const pesoEntrevistador = enquete.pesoEntrevistador;
      const numResp = enquete.numResposta;

      const promises = enquete.pergunta?.map(async (perguntaId) => {
        if (perguntaId) {
          const resultado = await this.repository.gerarAggregateAllRespostas(perguntaId, nameEntrevistado!, nameEntrevistador!, pesoEntrevistado!, pesoEntrevistador!);
          arrayPerguntas.push(resultado as Pergunta);
        }
      }) || [];

      await Promise.all(promises);

      // Ordenar o array pelo campo 'codigo'
      arrayPerguntas.sort((a, b) => a.codigoPergunta! - b.codigoPergunta!);

      // Gerar o PDF e obter o fileName e pdfIds
      const { pdfPath, pdfId } = await this.pdfService.gerarPdf(arrayPerguntas, enquete.nome ?? '', id ?? '', 'relatorioAllRespostas');

      console.log(`PDF gerado com sucesso: ${pdfPath}`);

      // Enviar resposta com array de perguntas, nome do arquivo e IDs dos PDFs salvos
      return ({ arrayPerguntas, fileName: path.basename(pdfPath), pdfId });


    } catch (e) {
      console.log(e);
      return null;
    }

  }

  async relatorioPremiada(id: string, colocado: string) {
    try {
      const enquete = await this.repository.findById(id);
      if (!enquete) {
        console.log('Enquete não encontrada');
        return null;
      }

      const arrayPerguntas: Pergunta[] = [];
      const nameEntrevistado = enquete.nameEntrevistado;
      const nameEntrevistador = enquete.nameEntrevistador;
      

      const promises = enquete.pergunta?.map(async (perguntaId) => {
        if (perguntaId) {
          const resultado = await this.perguntaService.premiado(perguntaId, colocado,  nameEntrevistado!, nameEntrevistador!);
          arrayPerguntas.push(resultado as Pergunta);
        }
      }) || [];

      await Promise.all(promises);

      // Ordenar o array pelo campo 'codigo'
      arrayPerguntas.sort((a, b) => a.codigoPergunta! - b.codigoPergunta!);

      // Gerar o PDF e obter o fileName e pdfIds
      const { pdfPath, pdfId } = await this.pdfService.gerarPdf(arrayPerguntas, enquete.nome ?? '', id ?? '', 'relatorioPremiada');

      console.log(`PDF gerado com sucesso: ${pdfPath}`);

      // Enviar resposta com array de perguntas, nome do arquivo e IDs dos PDFs salvos
      return ({ arrayPerguntas, fileName: path.basename(pdfPath), pdfId });


    } catch (e) {
      console.log(e);
      return null;
    }

  }

}

