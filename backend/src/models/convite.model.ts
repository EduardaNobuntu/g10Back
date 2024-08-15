import { BaseResourceModel } from "./base-resource.model";

interface IConvite {
  userName?: string;
  userEmail?: string;
  date?: Date;
  roles?: [string];
  token?: string;
  expirationDate?: Date;

 
}

export class Convite extends BaseResourceModel implements IConvite {
  static findById(arg0: any) {
    throw new Error("Method not implemented.");
  }
  userName?: string;
  userEmail?: string;
  date?: Date;
  roles?: [string];
  token?: string;
  expirationDate?: Date;

  static fromJson(jsonData: any) : Convite {
    return Object.assign(new Convite(), jsonData);
  }
}