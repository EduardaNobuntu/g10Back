import { DataTypes, Sequelize } from "sequelize";

export default function defineModel(sequelize: Sequelize){
  const schema = sequelize.define('Convite', {
    userName: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    roles: {
      type: DataTypes.STRING, //COMO FAZER ARRAY
    },
    token: {
      type: DataTypes.STRING,
    },
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
