import { BaseResourceModel } from "./base-resource.model";

interface IEmpresa {
  nome?: string;
  cnpj?: string;
  email?: string;
  telefone?: number;
 
}

export class Empresa extends BaseResourceModel implements IEmpresa {
    nome?: string;
    cnpj?: string;
    email?: string;
    telefone?: number;

  static fromJson(jsonData: any) : Empresa {
    return Object.assign(new Empresa(), jsonData);
  }
}