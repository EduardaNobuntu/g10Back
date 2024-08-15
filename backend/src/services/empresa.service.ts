import { DbType } from "../adapters/createDb.adapter";
import { Empresa } from "../models/empresa.model";
import EmpresaRepository from "../repository/empresa.repository";
import BaseService from "./base.service";

export class EmpresaService extends BaseService<Empresa> {

  repository: EmpresaRepository;

  constructor(dbType: DbType, model: any) {
    var _repository: EmpresaRepository = new EmpresaRepository(dbType, model);
    super(_repository, dbType, model);
    this.repository = _repository;
  }

  
}

