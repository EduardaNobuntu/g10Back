import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Empresa } from "../models/empresa.model";
import BaseRepository from "./base.repository";

export default class EmpresaRepository extends BaseRepository<Empresa>{


  constructor(dbType: DbType, model: any){
    const _adapter : IDatabaseAdapter<Empresa> = createDbAdapter<Empresa>(dbType, model, Empresa.fromJson);
    super(_adapter);
  }

 
}