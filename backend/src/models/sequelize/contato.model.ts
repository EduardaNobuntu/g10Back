import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('Contato', {
    email: {
      type: DataTypes.STRING,
    },
    nome: {
      type: DataTypes.STRING,
    },
    telefone: {
      type: DataTypes.NUMBER,
    },
    //TODO fazer relaçào com a tabela ROLES e Tenant
  }, {
    timestamps: true,
  });

  schema.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    values.id = values.id;
    delete values._id;
    delete values.__v;
    return values;
  };

  return schema;
}
