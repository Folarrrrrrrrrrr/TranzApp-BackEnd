const { DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("./index");

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    identificationNumber: DataTypes.STRING,
    identificationType: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    // balance: {
    //   type: INTEGER,
    //   default: 0
      
    // }
  }, {
    freezeTableName : true
  });
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