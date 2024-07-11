const { DataTypes, STRING } = require("sequelize");
const { sequelize, transactions } = require(".");
const tierType = require("./tierType");
const CustomerAccount = require("./CustomerAccount");


module.exports = (sequelize, DataTypes)=>{
        const accountType = sequelize.define('card', {
            // id:{
            //     type: DataTypes.NUMBER,
            //     allowNull:false,
            //     primaryKey: true
            // },

            cardNumber:{ type: DataTypes.STRING},
            cvv:{ type: DataTypes.STRING},
            cardType:{
                type: aTypes.ENUM('Master','Visa', 'Valve',),
                allowNull: falseDat
            },
            // cardType:{ type: DataTypes.STRING},
            description:{ type: DataTypes.TEXT},
        })
        // ,{});
        // accountType.associate = function(models) {
        //     //relationships are defined here
        //     accountType.hasMany(sequelize.define(CustomerAccount))
        // }
        return accountType
}