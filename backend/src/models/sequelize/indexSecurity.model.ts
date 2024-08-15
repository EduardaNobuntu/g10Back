import { ModelStatic, Sequelize } from "sequelize";

//TODO precisará ser gerada as importações
import userModel from "./user.model";
import roleModel from "./role.model";
import tenantModel from "./tenant.model";
import userTenantModel from "./userTenant.model";
import tenantCredentialModel from "./tenantCredential.model";
import functionSystemModel from "./functionSystem.model";
import functionSystemRoleModel from "./functionSystemRole.model";
import userRoleModel from "./userRole.model";

export default async function setModels(sequelize: Sequelize) {

  const user = userModel(sequelize);
  const role = roleModel(sequelize);
  const userRole = userRoleModel(sequelize);
  const tenant = tenantModel(sequelize);
  const userTenant = userTenantModel(sequelize);
  const tenantCredential = tenantCredentialModel(sequelize);
  const functionSystem = functionSystemModel(sequelize);
  const functionSystemRole = functionSystemRoleModel(sequelize);

  //Relação de muitos pra muitos de User para Role
  user.belongsToMany(role, {through: userRole});
  role.belongsToMany(user, {through: userRole});

  //Relação de muitos pra muitos de User para Tenant
  user.belongsToMany(tenant, { through: userTenant });
  tenant.belongsToMany(user, { through: userTenant });

  //Relação de muitos pra muitos entre Role e FunctionsSystem
  role.belongsToMany(functionSystem, { through: functionSystemRole });
  functionSystem.belongsToMany(role, { through: functionSystemRole });

  await sequelize.sync();

  const models = {
    user,
    role,
    userRole,
    tenant,
    userTenant,
    tenantCredential,
    functionSystem,
    functionSystemRole
    //Precisará ser gerado aqui os nomes das variáveis de cada model
  }

  return models;
}