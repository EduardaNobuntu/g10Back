import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Demografica } from "../models/demografica.model";
import BaseRepository from "./base.repository";

export default class DemograficaRepository extends BaseRepository<Demografica> {

  constructor(dbType: DbType, model: any) {
    const _adapter: IDatabaseAdapter<Demografica> = createDbAdapter<Demografica>(dbType, model, Demografica.fromJson);
    super(_adapter);
  }

  public async salvarDemografica(demografica: any) {
    try {
      const _demografica = ({
        codPergDemografica: demografica.codigo,
        descPergDemografica: demografica.descricao,
        tipoPergDemografica: demografica.tipoPergunta,
      });

      const novaDemografica = await this.adapter.create(_demografica);
      return novaDemografica;
    } catch (error) {
      console.log("Erro ao salvar demografica! " + error);
      return null;
    }
  }

  public async saveAlternativa(alternativaEncontrada: any, idDemografica: any) {
    try {
      const alternativa = {
        codAlterPergDemografica: alternativaEncontrada.codigo,
        descAlterPergDemografica: alternativaEncontrada.descricao
      };

      const demografica = await this.adapter.findById(idDemografica);
      if (!demografica) {
        console.log(`Demografica with id ${idDemografica} not found.`);
        return;
      }

      demografica.alternativaPergDemografica!.push(alternativa);
      await this.adapter.update(idDemografica, demografica);
    } catch (error) {
      console.log(error);
      console.log('Error adding alternativa to Demografica.');
    }
  }


}