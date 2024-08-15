import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Convite } from "../models/convite.model";
import BaseRepository from "./base.repository";

export default class ConviteRepository extends BaseRepository<Convite>{

  constructor(dbType: DbType, model: any){
    const _adapter : IDatabaseAdapter<Convite> = createDbAdapter<Convite>(dbType, model, Convite.fromJson);
    super(_adapter);
  }

 
}