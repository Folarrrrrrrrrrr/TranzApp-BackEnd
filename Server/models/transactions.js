const { DataTypes, STRING } = require("sequelize");
const { sequelize, transactions } = require(".");


module.exports = (sequelize, DataTypes)=>{
        const transactionDetails = sequelize.define('transactions', {
                // id:{
                //         type: DataTypes.UUID,
                //         allowNull:false,
                //         primaryKey: true
                // },
                customerID:{ type: DataTypes.STRING},
                transAmount:{ type: DataTypes.DOUBLE},
                transPurpose:{ 
                        type: DataTypes.ENUM('DEPOSIT','TRANSFER', 'REVERSAL', 'DATA', 'AIRTIME'),
                        allowNull: false},
                beneficiaryName:{ type: DataTypes.STRING},
                beneficiaryAccount:{ type: DataTypes.INTEGER},
                description:{ type: DataTypes.TEXT},
                reference:{ type: DataTypes.UUID},
                transPeriod:{ type: DataTypes.DATE},
                isCompleted:{ 
                        type: DataTypes.BOOLEAN, 
                        default: false
                    },
                isPending:{ 
                        type: DataTypes.BOOLEAN, 
                        default: false
                    },
                // transactions:{ type: DataTypes.STRING}
        })
        // ,{});
        // transactionDetails.associate = (models)=>{
        //         //realtionships are defined here
        //         transactionDetails.belongsTo(models.transactionType);
        //         transactionDetails.belongsTo(models.CustomerAccount);

        // }
        return transactionDetails
}