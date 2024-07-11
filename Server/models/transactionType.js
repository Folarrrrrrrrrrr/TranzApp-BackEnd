const { DataTypes, STRING } = require("sequelize");
const { sequelize, transactions } = require(".");


module.exports = (sequelize, DataTypes)=>{
        const transactionType = sequelize.define('transactionType', {
                // id:{
                //         type: DataTypes.NUMBER,
                //         allowNull:false,
                //         primaryKey: true
                // },
                transactionTypeID:{ type: DataTypes.STRING},
                description:{ type: DataTypes.TEXT},
                // transactions:{ type: DataTypes.STRING}
        })
        // ,{});
        // transactionType.associate= (models)=>{
        //     transactionType.hasMany(sequelize.define('transactions'));
        // }
        return transactionType
}