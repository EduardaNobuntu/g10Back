import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Contato } from "../models/contato.model";
import BaseRepository from "./base.repository";

export default class ContatoRepository extends BaseRepository<Contato>{

  constructor(dbType: DbType, model: any){
    const _adapter : IDatabaseAdapter<Contato> = createDbAdapter<Contato>(dbType, model, Contato.fromJson);
    super(_adapter);
  }

  public async salvarContato(contato: any) {
    try {
      const _contato = ({
          email: contato.email,
          nome: contato.nome,
          telefone: contato.telefone,
      });
      const novaContato = await this.adapter.create(_contato);
      return novaContato;
  } catch (error) {
      console.log("Erro ao salvar contato! " + error);
      return null;
  }
  }

 
}