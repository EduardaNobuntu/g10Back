import { DbType } from "../adapters/createDb.adapter";
import { Contato } from "../models/contato.model";
import ContatoRepository from "../repository/contato.repository";
import BaseService from "./base.service";
import { TransmissaoService } from "./transmissao.service";
const csvHandler = require('../utils/componentUploadCsv');

export class ContatoService extends BaseService<Contato> {

  repository: ContatoRepository;
  transmissaoService!: TransmissaoService;

  constructor(dbType: DbType, model: any) {
    //Cria o repositório com dados para obter o banco de dados
    var _repository: ContatoRepository = new ContatoRepository(dbType, model);
    super(_repository, dbType, model);
    this.repository = _repository;
  }

  async createContatoByCsv(id: string, data: any) {
    csvHandler.uploadFile(data, this.repository)
  }

  async uploadContato(id: any, csvFilePath: any){
    if(this.dbType == 'mongodb'){
      csvHandler.uploadFile(async () => {

        csvHandler.uploadFile(async () => {
          try {
              const jsonObj = await csvHandler.parseCsv(csvFilePath);
              const contatosSalvos = await csvHandler.saveRecords(jsonObj, this.repository.salvarContato);
  
              for (const contatoSalvo of contatosSalvos) {
                  await this.transmissaoService.update(id, { $push: { contato: contatoSalvo.id } });
              }
  
              return ({ message: 'Deu bom!' });
          } catch (error) {
              return ({ message: 'Deu ruim!' + error });
          }
      });
    });
      return null;
    }else{
      return null;
    }
  }


}

