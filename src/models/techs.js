'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Techs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {foreignKey: 'tech_id',through: 'user_techs', as: 'user'})
    }
  };
  Techs.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Campo nome não informado'},
        notEmpty:{msg:'Digite um nome não vazio'}
      }
    }
  }, {
    sequelize,
    modelName: 'Tech',
    tableName: 'Techs'
  });
  return Techs;
};