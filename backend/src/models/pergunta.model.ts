import { BaseResourceModel } from "./base-resource.model";

interface IRespostaPerg {
    usuario?: string;
    answer?: any;
    quemRespondeu?: string;
  }
  
  interface IAlternativaPerg {
    codigoAlternativa?: number;
    descricaoAlternativa?: string;
  }
  
  interface IPergunta {
    codigoPergunta?: number;
    descricao?: string;
    tipoPergunta?: string;
    obrigatoria?: boolean;
    outro?: boolean;
    bloco?: string;
    alternativa?: IAlternativaPerg[];
    resposta?: IRespostaPerg[];
  }
  


export class RespostaPerg extends BaseResourceModel implements IRespostaPerg {
  usuario?: string;
  answer?: any;
  quemRespondeu?: string;

  static fromJson(jsonData: any): RespostaPerg {
    return Object.assign(new RespostaPerg(), jsonData);
  }
}

export class AlternativaPerg extends BaseResourceModel implements IAlternativaPerg {
  codigoAlternativa?: number;
  descricaoAlternativa?: string;

  static fromJson(jsonData: any): AlternativaPerg {
    return Object.assign(new AlternativaPerg(), jsonData);
  }
}

export class Pergunta extends BaseResourceModel implements IPergunta {
    codigoPergunta?: number;
    descricao?: string;
    tipoPergunta?: string;
    obrigatoria?: boolean;
    outro?: boolean;
    bloco?: string;
    alternativa?: IAlternativaPerg[];
    resposta?: IRespostaPerg[];

  static fromJson(jsonData: any): Pergunta {
    const pergunta = Object.assign(new Pergunta(), jsonData);
    if (jsonData.resposta) {
        pergunta.resposta = jsonData.resposta.map((item: any) => RespostaPerg.fromJson(item));
    }
    if (jsonData.alternativa) {
        pergunta.alternativa = jsonData.alternativa.map((item: any) => AlternativaPerg.fromJson(item));
    }
    return pergunta;
  }
}
