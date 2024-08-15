import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('Demografica', {
    codPergDemografica: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    descPergDemografica: {
      type: DataTypes.STRING,
    },
    tipoPergDemografica: {
      type: DataTypes.STRING,
    },
    perguntaNoRelatorio: {
      type: DataTypes.STRING,
    },
    //TODO fazer NOVOS SCHEMAS ALTERNATIVA E RESPOSTA
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
