import { DbType } from "../adapters/createDb.adapter";
import { Pergunta } from "../models/pergunta.model";
import PerguntaRepository from "../repository/pergunta.repository";
import BaseService from "./base.service";
import { EnqueteService } from "./enquete.service";
const alternativasComponent = require("./alternativa.service");
const respostasComponent = require("./resposta.service");
const csvHandler = require('../utils/componentUploadCsv');

export class PerguntaService extends BaseService<Pergunta> {

  repository: PerguntaRepository;
  enqueteService!: EnqueteService;

  constructor(dbType: DbType, model: any) {
    //Cria o repositório com dados para obter o banco de dados
    var _repository: PerguntaRepository = new PerguntaRepository(dbType, model);
    super(_repository, dbType, model);
    this.repository = _repository;
  }

  async obterRespostasDeTodasPerguntas(id: string, nameEntrevistado: string, nameEntrevistador: string, pesoEntrevistado: string, pesoEntrevistador: string): Promise<Object | null> {
    //Chamar servico da entidade pergunta para obter pelo id
    //const pergunta = await Pergunta.findById(id);
    const perguntaService: PerguntaService = new PerguntaService(this.dbType, this.model);
    const pergunta = await perguntaService.findById(id) as any;
    if (!pergunta) {
      return null;
      //return res.status(404).json({ message: "A entidade pergunta com id " + id + " não encontrada!" });
    }

    const descricaoPergunta = pergunta.descricao;
    const codigoPergunta = pergunta.codigoPergunta;

    const data = this.repository.obterRespostasDeTodasPerguntas(id, pesoEntrevistado, pesoEntrevistador) as any;


    const respostas = data.map((item: any) => ({
      answer: item.answer,
      count: item.count,
      countEntrevistado: item.countEntrevistado,
      countEntrevistador: item.countEntrevistador,
      countPeso: item.countPeso
    }));

    const result = {
      codigoPergunta: codigoPergunta,
      descricao: descricaoPergunta,
      respostas: respostas,
      nameEntrevistado: nameEntrevistado,
      nameEntrevistador: nameEntrevistador
    };

    return result;
  }

  async createAlternativa(id: string, data: any) {
    if(this.dbType == 'mongodb'){
      const novaAlternativa = {
        codigoAlternativa: data.codigo,
        descricaoAlternativa: data.descricao
      };
  
      const result = await alternativasComponent.createAlternativa(id, this.model, 'alternativa', novaAlternativa);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
    
    }else{
      return null;
    }
   }

  async updateAlternativa(id: string, data: any) {
    if(this.dbType == 'mongodb'){
      const novaAlternativa = {
        codigoAlternativa: data.codigo,
        descricaoAlternativa: data.descricao
      };
  
      const result = await alternativasComponent.updateAlternativa(id, this.model, 'alternativa', 'codigoAlternativa', 'descricaoAlternativa', novaAlternativa);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
  
    }else{
      return null;
    }
    
  }

  async findAlternativa(id:string) {
    if(this.dbType == 'mongodb'){
      const result = await alternativasComponent.findAlternativas(id, this.model, 'alternativa');
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
  
    }else{
      return null;
    }
    
  }

  async createResposta(id: string, data: any) {
    if(this.dbType == 'mongodb'){
      const novaResposta = {
        answer: data.answer,
        usuario: data.usuario,
        quemRespondeu: data.quemRespondeu
      };
    
      const result = await respostasComponent.createResposta(id, this.model, 'resposta', novaResposta);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };

    }else{
      return null;
    }

  }

  async updateResposta(id: string, data: any) {
    if(this.dbType == 'mongodb'){
      const result = await respostasComponent.updateResposta(id, this.model, 'resposta', data);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };

    }else{
      return null;
    }
  }

  async updateAllRespostas(id:string, data:any) {
    if(this.dbType == 'mongodb'){
      const result = await respostasComponent.updateAllRespostas(id, this.model, 'resposta', data);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };

    }else{
      return null;
    }
  }

  async getRespostas(id: string, idUser:string) {
    if(this.dbType == 'mongodb'){
      const result = await respostasComponent.getResposta(id, idUser, this.model, 'resposta');
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };

    }else{
      return null;
    }
  }

  async groupRespostas(id:string, numResp: any, pesoEntrevistado:any, pesoEntrevistador:any) {
    if(this.dbType == 'mongodb'){
      const result = await respostasComponent.groupRespostas(id, this.model, 'resposta', numResp, pesoEntrevistado, pesoEntrevistador);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };

    }else{
      return null;
    }
  }

  async getQuestionWithResponses(id: string) {
    if(this.dbType == 'mongodb'){
      return this.repository.getQuestionWithResponses(id);
      
    }else{
      return null;
    }
  }

  async premiado(id: string, colocado: any, nameEntrevistado: string, nameEntrevistador: string) {
   //TODO: verificar o nameEntrevistado e nameEntrevistador
    if(this.dbType == 'mongodb'){
      return this.repository.premiado(id, colocado);
    }else{
      return null;
    }

  }

  async uploadPergunta(id: any, csvFilePath: any): Promise<Object> {

    return csvHandler.uploadFile(async () => {

      try {
        const jsonObj = await csvHandler.parseCsv(csvFilePath);
        let previousPergunta = null;

        for (const pergunta of jsonObj) {
          if (pergunta.tipo == "P") {
            const perguntaSalva = await this.repository.salvarPergunta(pergunta);
            await this.enqueteService.update(id, { $push: { pergunta: perguntaSalva!.id } });
            previousPergunta = perguntaSalva!.id;
          } else {
            await this.repository.saveAlternativa(pergunta, previousPergunta);
          }
        }

        return { status: 200, message: 'Deu bom!' };
      } catch (error) {
        return { status: 404, message: 'Deu ruim!' + error };
      }
    });
  }

  //TODO: async uploadResposta()


}

