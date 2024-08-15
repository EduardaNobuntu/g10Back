import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('TenantCredential', {
    dbName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbHost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbPort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbConfig: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['dbName', 'dbType', 'dbUsername', 'dbHost', 'dbPort'],
      },
    ],
  });

  schema.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    values.id = values.id;
    delete values._id;
    delete values.__v;
    return values;
  };

  return schema;
};