const bcrypt = require('bcrypt')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tech, {foreignKey: 'user_id',through: 'user_techs', as: 'techs'})
    }
  };
  User.init({
    name:{ 
      type: DataTypes.STRING,
      len:[5,20]
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Informe um email'},
        isEmail:{msg: 'Email invalido'}
      }
    },
    birthday: {
      type:DataTypes.DATEONLY,
      validate:{
        isDate:{msg:'Data invalida'},
        isFormatCorrect(value){
          const correct = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
          if(!correct)
            throw new Error('Formato de data invalida')
        }
      }
      
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{ msg:'Campo senha não foi informado'},
        notEmpty:{msg:'Informe uma senha não vazia'},
        len:{ args:[5] ,msg:'Senha dever ter no minimo 5 caracteres'}
      }
    }
  }, 
  {
    sequelize,
    modelName: 'User',
  });

  User.addHook('afterValidate',(user,options)=>{
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password,salt)
  })

  return User;
};