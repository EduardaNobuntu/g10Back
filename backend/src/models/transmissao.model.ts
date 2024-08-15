import { BaseResourceModel } from "./base-resource.model";

interface ITransmissao {
  nome?: string;
  assunto?: string;
  mensagem?: string;
  emailRemetente?: string;
  emailSenha?: string;
  contato?: string[];
}

export class Transmissao extends BaseResourceModel implements ITransmissao {
    nome?: string;
    assunto?: string;
    mensagem?: string;
    emailRemetente?: string;
    emailSenha?: string;
    contato?: string[];

  static fromJson(jsonData: any) : Transmissao {
    return Object.assign(new Transmissao(), jsonData);
  }
}