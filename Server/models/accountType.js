const { DataTypes, STRING } = require("sequelize");
const { sequelize, transactions } = require(".");
const tierType = require("./tierType");
const CustomerAccount = require("./CustomerAccount");


module.exports = (sequelize, DataTypes)=>{
        const accountType = sequelize.define('accountType', {
            // id:{
            //     type: DataTypes.NUMBER,
            //     allowNull:false,
            //     primaryKey: true
            // },

            typeName:{ type: DataTypes.STRING},
            description:{ type: DataTypes.TEXT},
        })
        // ,{});
        // accountType.associate = function(models) {
        //     //relationships are defined here
        //     accountType.hasMany(sequelize.define(CustomerAccount))
        // }
        return accountType
}