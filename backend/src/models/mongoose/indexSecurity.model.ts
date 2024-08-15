import { Model, Mongoose } from "mongoose";

//TODO precisará ser gerada as importações
import userModel from "./user.model";
import tenantModel from "./tenant.model";
import tenantCredentialModel from "./tenantCredential.model";
import userTenantModel from "./userTenant.model";
import roleModel from "./role.model";
// import functionSystemModel from "./functionSystem.model";
// import functionSystemRoleModel from "./functionSystemRole.model";

export default async function setModels(mongooseConnection: Mongoose) {

  const user = userModel(mongooseConnection);
  const tenant = tenantModel(mongooseConnection);
  const tenantCredential = tenantCredentialModel(mongooseConnection);
  const userTenant = userTenantModel(mongooseConnection);
  const role = roleModel(mongooseConnection);
  // const functionSystem = functionSystemModel(mongooseConnection);
  // const functionSystemRole = functionSystemRoleModel(mongooseConnection);

  const models = {
    user,
    role,
    tenant,
    userTenant,
    tenantCredential,
    //functionSystem,
    //functionSystemRole
    //Precisará ser gerado aqui os nomes das variáveis de cada model
  }

  //TODO precisará ser gerado várias linhas como essa abaixo, com o model diferente

  return models;
}