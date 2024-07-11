const dbConfig =require('../config/dbConfig');
// const Sequelize = require('sequelize')
const {Sequelize, DataType, DataTypes} = require('sequelize');


const sequelize = new Sequelize(
    dbConfig.DATABASE, 
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,

        }
    }
);

sequelize.authenticate().then(()=>{
    console.log('sequelize connection tested and authenticated...')
}).catch(err =>{
    console.log('error'+ err)
})

db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models={};

db.models.User = require('./usersModel')(sequelize, Sequelize.DataTypes);
db.models.customer = require('./CustomerAccount.js')(sequelize, DataTypes)
db.models.transactions = require('./transactions.js')(sequelize, DataTypes)
db.models.accountType = require('./accountType.js')(sequelize, DataTypes)
db.models.transactionType = require('./transactionType.js')(sequelize, DataTypes)
db.models.tierType = require('./tierType.js')(sequelize, DataTypes)
db.models.wallet = require('./wallet.js')(sequelize, DataTypes)


// db.sequelize.sync({force: false})// will stop sequelize from creating again an existing table or date to avoid data loss
// .then(()=>{
//     console.log('yes re-sync done');
// })

//Relationships (One-to-many)
    // 1.   Account type and customer account relationship
// db.accountType.hasMany(db.customer, {
//     foreignKey: 'accountType_id',
//     as: 'customer'
// })

// db.customer.belongsTo(db.accountType, {
//     foreignKey: 'customer_id', 
// })

//     //2.    Transaction type and transactions relationship
// db.transactionType.hasMany(db.transactions, {
//     foreignKey: 'transactionType_id',
//     as: 'transactions'
// })

// db.transactions.belongsTo(db.transactionType, {
//     foreignKey: 'transactions_id', 
// })

//     //3.    tier type and customer account relationship
// db.tierType.hasMany(db.customer, {
//     foreignKey: 'tierType_id',
//     as: 'customer'
// })

// db.customer.belongsTo(db.tierType, {
//     foreignKey: 'customer_id', 
// })

//     //4.    Transactions and customer account relationship
// db.customer.hasMany(db.transactions, {
//     foreignKey: 'customer_id',
//     as: 'transactions'
// })

// db.transactions.belongsTo(db.customer, {
//     foreignKey: 'transactions_id', 
// })


module.exports = db;

