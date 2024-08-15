import { BaseResourceModel } from "./base-resource.model";

interface IRespostaDemo {
    usuario?: string;
    answerPergDemografica?: any;
    quemRespondeu?: string;
  }
  
  interface IAlternativaDemo {
    codAlterPergDemografica?: number;
    descAlterPergDemografica?: string;
  }
  
  interface IDemografica {
    codPergDemografica?: number;
    descPergDemografica?: string;
    tipoPergDemografica?: string;
    perguntaNoRelatorio?: string;
    respostaPergDemografica?: IRespostaDemo[];
    alternativaPergDemografica?: IAlternativaDemo[];
  }
  


export class RespostaDemo extends BaseResourceModel implements IRespostaDemo {
  usuario?: string;
  answerPergDemografica?: any;
  quemRespondeu?: string;

  static fromJson(jsonData: any): RespostaDemo {
    return Object.assign(new RespostaDemo(), jsonData);
  }
}

export class AlternativaDemo extends BaseResourceModel implements IAlternativaDemo {
  codAlterPergDemografica?: number;
  descAlterPergDemografica?: string;

  static fromJson(jsonData: any): AlternativaDemo {
    return Object.assign(new AlternativaDemo(), jsonData);
  }
}

export class Demografica extends BaseResourceModel implements IDemografica {
  codPergDemografica?: number;
  descPergDemografica?: string;
  tipoPergDemografica?: string;
  perguntaNoRelatorio?: string;
  respostaPergDemografica?: RespostaDemo[];
  alternativaPergDemografica?: AlternativaDemo[];

  static fromJson(jsonData: any): Demografica {
    const demografica = Object.assign(new Demografica(), jsonData);
    if (jsonData.respostaPergDemografica) {
      demografica.respostaPergDemografica = jsonData.respostaPergDemografica.map((item: any) => RespostaDemo.fromJson(item));
    }
    if (jsonData.alternativaPergDemografica) {
      demografica.alternativaPergDemografica = jsonData.alternativaPergDemografica.map((item: any) => AlternativaDemo.fromJson(item));
    }
    return demografica;
  }
}
