import { Connection } from "mongoose";
import { Sequelize } from "sequelize";
import { DbType } from "../adapters/createDb.adapter";

export default class TenantConnection {
  models: any;
  connection: Connection | Sequelize;
  databaseType: DbType;
  expireAt: Date;
  isDefaultConnection: boolean;
  tenantId: any;

  constructor(databaseType: DbType, connection: Connection | Sequelize, isDefaultConnection: boolean) {
    this.connection = connection;
    this.databaseType = databaseType;
    this.expireAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.isDefaultConnection = isDefaultConnection;
    this.models = {};
  }

  setModels(models: any): void {
    this.models = models;
  }

  getModels(): any {
    return this.models;
  }
}