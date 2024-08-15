import { BaseResourceModel } from "./base-resource.model";

interface IContato {
  email?: string;
  nome?: string;
  telefone?: number;
 
}

export class Contato extends BaseResourceModel implements IContato {
  static findById(arg0: any) {
    throw new Error("Method not implemented.");
  }
    email?: string;
    nome?: string;
    telefone?: number;

  static fromJson(jsonData: any) : Contato {
    return Object.assign(new Contato(), jsonData);
  }
}