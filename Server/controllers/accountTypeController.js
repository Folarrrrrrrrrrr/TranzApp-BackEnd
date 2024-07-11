const { where } = require('sequelize');
const db = require('../models') ;
const accountType = require('../models/accountType');
const bodyParser = require('body-parser')
// main model creation

const AccountType = db.accountType;
const CustomerAccount = db.CustomerAccount;
const TierType = db.tierType;
const Transactions = db.transactions;
const TransactionType = db.transactionType;

//main work

// 1.   create Account

const addAccountTypeCustomer = async(req, res) =>{
    try{
        //assigning to json body first
        let info = {
            typeName: req.body.typeName,
            description: req.body.description
        }
        //passing info to created account type and stoing in a variable

        const accountType = await AccountType.create(info)

        //
        // if (CustomerAccount && CustomerAccount.length > 0){
        //     const createdCustomer = await Promise.all(CustomerAccount.map(customerAccount =>{
        //         return customerAccount.create({
        //             customerId:CustomerAccount.id,
        //             customerName: CustomerAccount.customerName, 
        //         });
        //     }));
        //     accountType.customerAccount = createdCustomer;
        // }
        res.status(201).send(accountType);
    } catch(error){
        console.error('Error creating accountType: ', error);
        res.status(500).json({error:'internal server error'});
    }
}
//2. getting all accountTypes
const getAllAccountType = async (req, res)=>{
    let Accounts = await accountType.findAll({})
    res.status(200).send(Accounts);
};

//3. getting one accounts
const getAccountTypebyId = async (req, res)=>{
    let id = req.params.id;
    let Accounts = await accountType.findOne({where: {id:id}})
    res.status(200).send(Accounts);

}

//4. update one accounts
const updateAccountTypebyId = async (req, res)=>{
    let id = req.params.id;

    const Accounts = await  accountType.update(req.body, {where: {id:id}})
    res.status(200).send(Accounts);
};

//5. delete one accounts
const deleteAccountTypebyId = async (req, res)=>{
    let id = req.params.id;

    await accountType.destroy({where: {id:id}})
    res.status(200).send('Account type is successfully deleted');
}; 
//5. connect one-to-many


const getAccountTypeCustomer = async (req, res)=>{
    let id = req.params.id
    const data = await accountType.findAll({
        include: [{
            model: CustomerAccount,
            as: 'customer'
        }],
        where:{id: id},
    })
    res.status(200).send(data)
};

module.exports = {
    addAccountTypeCustomer,
    getAllAccountType,
    getAccountTypebyId,
    updateAccountTypebyId,
    deleteAccountTypebyId,
    getAccountTypeCustomer
};

