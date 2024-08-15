import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('Pdf', {
    fileName: {
      type: DataTypes.STRING,
    },
    fileContent: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    //TODO fazer relaçào com a tabela Enquete
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
