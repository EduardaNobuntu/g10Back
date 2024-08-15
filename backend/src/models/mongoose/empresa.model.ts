import mongoose, { Mongoose, Schema } from "mongoose";

export default function defineModel(mongooseConnection: Mongoose){
  // Verifica se o modelo já foi criado para a conexão específica (Toda vez que é feito a conexão nova ao banco de dados, é preciso setar os models, porém só pode fazer isso uma vez por conexão, se fizer mais de uma vez dá erro. Por isso é verificado se dentro dos models da conexão existe o model)
  if (mongooseConnection.models.user) {
    return mongooseConnection.models.user;
  }

  var schema = new mongoose.Schema({
    nome: String,
    cnpj: String,
    email: String,
    telefone: Number,
  },
    { timestamps: true });

  schema.set('toJSON', {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

  return mongooseConnection.model("empresa", schema);
};
