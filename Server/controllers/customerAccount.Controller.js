const db = require('../models');

const customerAccs = db.customers;

// Logics
//  1. Creating a new account for a customer
const addCustomerAcc = async (req, res)=>{
    try{

        let data ={
            customerName:req.body.customerName,
            bvn:req.body.bvn,
            balance: req.body.balance,
            isDormant:req.body.isDormant,
            isActive: req.body.isActive
        }
        
        const newCustomerAcc = await customerAccs.create(data);

        res(200).send(newCustomerAcc);

    }catch(error){
        console.error('Error creating customer account: ', error);
        res.status(500).json({error:'internal server error'});
    }
}

//2.     Getting all the accounts created 

const  getAllAccounts = async ( req, res) =>{

    const  allAcounts = await customerAccs.findAll({})
    res(200).send(allAcounts);
}

//2.     Getting an account by id 

const  getAccountsByPK = async ( req, res) =>{
    let id = req.params.id;

    const  customerAcount = await customerAccs.findOne({where: {id:id}})
    res(200).send(customerAcount);
}

//2.     Getting an account by id 

const  updateAccountsByPK = async ( req, res) =>{
    let id = req.params.id;

    const  customerAcount = await customerAccs.update(req.body, {where: {id:id}})
    res(200).send(customerAcount);
}

//2.     Deleting an account by id 

const  deleteAccountsByPK = async ( req, res) =>{
    let id = req.params.id;

    await customerAccs.destroy(req.body, {where: {id:id}})
    res(200).send("Account is successfully deleted");
}

module.exports = {
    addCustomerAcc,
    getAllAccounts,
    getAccountsByPK,
    updateAccountsByPK,
    deleteAccountsByPK
};