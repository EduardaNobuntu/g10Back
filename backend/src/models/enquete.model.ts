import { BaseResourceModel } from "./base-resource.model";

interface IEnquete {
    nome?: string;
    ativa?: string;
    dataHoraInicio?: Date;
    dataHoraFinal?: Date;
    entrevistado?: string;
    pesoEntrevistado?: number;
    entrevistador?: string;
    pesoEntrevistador?: number;
    numResposta?: string;
    dividirEmBlocos?: number;
    showAlternativas?: string;
    nameEntrevistado?: string;
    nameEntrevistador?: string;
    pergunta?: [string];
    //transmissao?: string;
    //demografica?: string;

 
}

export class Enquete extends BaseResourceModel implements IEnquete {
    nome?: string;
    ativa?: string;
    dataHoraInicio?: Date;
    dataHoraFinal?: Date;
    entrevistado?: string;
    pesoEntrevistado?: number;
    entrevistador?: string;
    pesoEntrevistador?: number;
    numResposta?: string;
    dividirEmBlocos?: number;
    showAlternativas?: string;
    nameEntrevistado?: string;
    nameEntrevistador?: string;
    pergunta?: [string];
    //transmissao?: string;
    //demografica?: string;

  static fromJson(jsonData: any) : Enquete {
    return Object.assign(new Enquete(), jsonData);
  }
}