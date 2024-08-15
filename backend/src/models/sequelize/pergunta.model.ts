import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('Pergunta', {
    codigoPergunta: {
      type: DataTypes.NUMBER,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    tipoPergunta: {
      type: DataTypes.STRING,
    },
    obrigatoria: {
      type: DataTypes.BOOLEAN,
    },
    outro: {
      type: DataTypes.BOOLEAN,
    },
    bloco: {
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
