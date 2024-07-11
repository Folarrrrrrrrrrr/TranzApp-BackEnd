const { DataTypes, STRING } = require("sequelize");
const { sequelize, transactions } = require(".");


module.exports = (sequelize, DataTypes)=>{
        const tierType = sequelize.define('tierType', {
                // id:{
                //         type: DataTypes.NUMBER,
                //         allowNull:false,
                //         primaryKey: true
                // },
                tierType:{ type: DataTypes.STRING},
                 description:{ type: DataTypes.TEXT},
                // transactions:{ type: DataTypes.STRING}
        })
        // ,{});
        // tierType.associate = function(models) {
        //     //relationships are defined here
        //     tierType.hasMany(sequelize.define('CustomerAccount'))
        // }
        return tierType
}