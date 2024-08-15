import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('Transmissao', {
    nome: {
      type: DataTypes.STRING,
    },
    assunto: {
      type: DataTypes.STRING,
    },
    mensagem: {
      type: DataTypes.STRING,
    },
    emailRemetente: {
      type: DataTypes.STRING,
    },
    emailSenha: {
      type: DataTypes.STRING,
    },

    //TODO fazer relaçào com a tabela CONTATO
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
