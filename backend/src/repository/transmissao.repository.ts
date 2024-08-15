import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Transmissao } from "../models/transmissao.model";
import BaseRepository from "./base.repository";

export default class TransmissaoRepository extends BaseRepository<Transmissao>{

  dbType: DbType;

  constructor(dbType: DbType, model: any){
    const _adapter : IDatabaseAdapter<Transmissao> = createDbAdapter<Transmissao>(dbType, model, Transmissao.fromJson);
    super(_adapter);
    this.dbType = dbType;
  }

  public async createContato(id:string, contact: any) {
    if (this.dbType == 'mongodb') {
      return this.adapter.findById(id).then((transmissao: any) => {
        if (!transmissao) {
          return null;
        } else {
          transmissao.contato.push(contact.id);
          return this.adapter.update(id, transmissao);
        }
      });
    } else {
      return null;
    }
  }

 
}