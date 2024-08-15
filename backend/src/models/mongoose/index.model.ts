import { Model, Mongoose } from "mongoose";

//TODO precisará ser gerada as importações
import userModel from "./user.model";
import functionSystemModel from "./functionSystem.model";
import functionSystemRoleModel from "./functionSystemRole.model";
import orderModel from "./order.model";
import contatoModel from "./contato.model";
import conviteModel from "./convite.model";
import demograficaModel from "./demografica.model";
import empresaModel from "./empresa.model";
import enqueteModel from "./enquete.model";
import perguntaModel from "./pergunta.model";
import transmissaoModel from "./transmissao.model";

/**
 * Define os modelos que serão usados pelos usuários da aplicação
 * @param mongooseConnection Instância da conexão com o banco de dados mongodb
 * @returns retorna os modelos do banco de dados para ser usado suas operações
 */
export default async function setModels(mongooseConnection: Mongoose) {

  //TODO precisará ser gerado várias linhas como essa abaixo, com o model diferente
  const order = orderModel(mongooseConnection);

  const functionSystem = functionSystemModel(mongooseConnection);

  const functionSystemRole = functionSystemRoleModel(mongooseConnection);

  const user = userModel(mongooseConnection);

  const contato = contatoModel(mongooseConnection);

  const convite = conviteModel(mongooseConnection);

  const demografica = demograficaModel(mongooseConnection);

  const empresa = empresaModel(mongooseConnection);

  const enquete = enqueteModel(mongooseConnection);

  const pergunta = perguntaModel(mongooseConnection);

  const transmissao = transmissaoModel(mongooseConnection);

  const models = {
    order,
    functionSystem,
    functionSystemRole,
    user,
    contato,
    convite,
    demografica,
    empresa,
    enquete,
    pergunta,
    transmissao

    //Precisará ser gerado aqui os nomes das variáveis de cada model
  }

  return models;
}