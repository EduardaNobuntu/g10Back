import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('Enquete', {
    nome: {
      type: DataTypes.STRING,
    },
    ativa: {
      type: DataTypes.BOOLEAN,
    },
    dataHoraInicio: {
      type: DataTypes.DATE
    },
    dataHoraFinal: {
      type: DataTypes.DATE
    },
    entrevistado: {
      type: DataTypes.BOOLEAN,
    },
    pesoEntrevistado: {
      type: DataTypes.NUMBER,
    },
    entrevistador: {
      type: DataTypes.BOOLEAN,
    },
    pesoEntrevistador: {
     type: DataTypes.NUMBER,
    },
    numResposta: {
      type: DataTypes.STRING,
    },
    dividirEmBlocos: {
      type: DataTypes.NUMBER,
    },
    showAlternativas: {
      type: DataTypes.STRING,
    },
    nameEntrevistado: {
      type: DataTypes.STRING,
    },
    nameEntrevistador: {
      type: DataTypes.STRING,
    },
    //TODO fazer relaçào com a tabela PERGUNTA TRANSMISSAO E DEMO
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
