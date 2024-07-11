

const { DataTypes, STRING } = require("sequelize");
const { sequelize, transactions } = require(".");

module.exports = (sequelize, DataTypes)=>{

    const Wallet = sequelize.define('wallet',{
        balance: { 
            type: DataTypes.FLOAT,
            allowNull:false,
            defaultValue: 0.0
        },
        userId: DataTypes.INTEGER,
    })

    return Wallet;
}

