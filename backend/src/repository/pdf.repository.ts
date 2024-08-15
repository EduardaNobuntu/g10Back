import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Pdf } from "../models/pdf.model";
import BaseRepository from "./base.repository";

export default class PdfRepository extends BaseRepository<Pdf>{

  constructor(dbType: DbType, model: any){
    const _adapter : IDatabaseAdapter<Pdf> = createDbAdapter<Pdf>(dbType, model, Pdf.fromJson);
    super(_adapter);
  }

 
}