import { DbType } from "../adapters/createDb.adapter";
import { Demografica } from "../models/demografica.model";
import DemograficaRepository from "../repository/demografica.repository";
import BaseService from "./base.service";
import { EnqueteService } from "./enquete.service";
const alternativasComponent = require("./alternativa.service");
const respostasComponent = require("./resposta.service");
const csvHandler = require('../utils/componentUploadCsv');


export class DemograficaService extends BaseService<Demografica> {

  dbType: DbType;
  model: any;
  repository: DemograficaRepository;
  alternativaService: any;
  enqueteService!: EnqueteService;

  constructor(dbType: DbType, model: any) {
    //Cria o repositório com dados para obter o banco de dados
    var _repository: DemograficaRepository = new DemograficaRepository(dbType, model);
    super(_repository, dbType, model);
    this.repository = _repository;
    this.dbType = dbType;
    this.model = model;
  }

  async getResposta(id:string, idUser: string) {
    if(this.dbType == 'mongodb'){
      const result =  await respostasComponent.getResposta(id, idUser, this.model,'respostaPergDemografica');
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
  
    }else{
      return null;
    }
  }

  async createResposta(id: string, data: any){
    if(this.dbType == 'mongodb'){
      const novaResposta = {
        answerPergDemografica: data.answerPergDemografica,
        usuario: data.usuario,
        quemRespondeu: data.quemRespondeu
      }
  
      const result = await respostasComponent.createResposta(id, this.model, 'respostaPergDemografica', novaResposta);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
  
    }else{
      return null;
    }
  }

  async groupRespostas(id: string, numResp: any, pesoEntrevistado: any, pesoEntrevistador:any){
    if(this.dbType == 'mongodb'){
      const result =  await respostasComponent.groupRespostas(id, this.model,'respostaPergDemografica', numResp, pesoEntrevistado, pesoEntrevistador );
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
  
    }else{
      return null;
    }
  
  }

  async createAlternativa(id: string, data: any){
    if(this.dbType == 'mongodb'){
      const novaAlternativa = {
        codAlterPergDemografica: data.codAlterPergDemografica,
        descAlterPergDemografica: data.descAlterPergDemografica
      };
    
      const result = await alternativasComponent.createAlternativa(id, this.model, 'alternativaPergDemografica', novaAlternativa);
    
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
    
    }else{
      return null;
    }
   }

  async updateAlternativa(id: string, data:any){
    if(this.dbType == 'mongodb'){
      const novaAlternativa = {
        codAlterPergDemografica: data.codAlterPergDemografica,
        descAlterPergDemografica: data.descAlterPergDemografica
      };
      
      const result = await alternativasComponent.updateAlternativa(id, this.model, 'alternativaPergDemografica', 'codAlterPergDemografica', 'descAlterPergDemografica' ,novaAlternativa);
      return result.status === 200 ? { status: 200, data: result.data } : { status: result.status, message: result.message };
  
    }else{
      return null;
    }
   
  }

  async uploadDemografica(id: any, csvFilePath: any){
    if(this.dbType == 'mongodb'){
      csvHandler.uploadFile(async () => {

        try {
            const jsonObj = await csvHandler.parseCsv(csvFilePath);
            let previousDemografica = null;

            for (const demografica of jsonObj) {
              if (demografica.tipo == "D") {
                  const demograficaSalva = await this.repository.salvarDemografica(demografica);
                  await this.enqueteService.update(id, { $push: { demografica: demograficaSalva!.id } });
                  previousDemografica = demograficaSalva!.id;
              } else {
                  await this.repository.saveAlternativa(demografica, previousDemografica);
              }
          }

            return ({ message: 'Deu bom!' });
        } catch (error) {
            return ({ message: 'Deu ruim!' + error });
        }
    });
      return null;
    }else{
      return null;
    }
  }

  
}

