const { DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("./index");
const { type } = require("express/lib/response");
const { Hooks } = require("sequelize/lib/hooks");

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.String,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.String,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.String,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.String,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.String,
      allowNull: false,
    },
    email: {
      type: DataTypes.String,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    accountNumber: {
      type: DataTypes.String,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.Date,
      defaultValue: DataTypes.Now
    },
    updatedAt: {
      type: DataTypes.Date,
      defaultValue: DataTypes.Now
    },
  },
    {
      Hooks: {
        beforeCreate: (user) => {
          user.accountNumber = User.phoneNumber;
        }
      }
    },
    {
      freezeTableName: true
    }
  );
  return User;
}









// const { Timestamp } = require("mongodb");
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     identificationType: {
//       type: String,
//       required: true,
//     },
//     identificationNumber: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );


// module.exports = mongoose.model('users', userSchema)