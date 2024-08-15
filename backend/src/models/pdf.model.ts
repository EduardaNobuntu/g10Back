import { BaseResourceModel } from "./base-resource.model";

interface IPdf {
  enquete?: string;
  fileName?: string;
  fileContent?: Buffer; // Armazenaremos o conteúdo do arquivo PDF como um Buffer
  descricao?: string;
 
}

export class Pdf extends BaseResourceModel implements IPdf {
  static findById(arg0: any) {
    throw new Error("Method not implemented.");
  }
    enquete?: string;
    fileName?: string;
    fileContent?: Buffer; // Armazenaremos o conteúdo do arquivo PDF como um Buffer
    descricao?: string;

  static fromJson(jsonData: any) : Pdf {
    return Object.assign(new Pdf(), jsonData);
  }
}