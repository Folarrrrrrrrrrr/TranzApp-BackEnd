const { where } = require('sequelize');
const db = require('../models') ;

//CRUD OPERATIONS
//1, create wallet
const WalletTable = db.models.wallet
const transaction = db.models.transactions

const createWallet = async (req, res )=>{
    var info = {
        balance:req.body.balance,
        userId:req.body.userId,
        } 
        // const { balance, userId }= req.body
    const Id = req.params.id
    const walletExist = await WalletTable.findByPK( {where: {Id}})
    if(walletExist) {
        return res.send({
        success: false,
        message: "user wallet already exists",
      })
    }

    const newWallet = await WalletTable.create(info)
    try{const savedWallet = await newWallet.save()}catch(error){ res.send({success: false, message: error.message + 'cant save wallet now try another time'})}

    if (savedWallet)res.status(200).send({
        message: "wallet saved successfully",
        // data: savedWallet, // we are setting data to null here because we dont want to send the wallet details to the frontend
        success: true,
      });
} 
    
//2. get wallet by id
const getWalletsById = async(req, res)=>{
    
    const Id = req.params.id
    const sortedWallet = await WalletTable.findByPK( {where: {Id}})
    try{
     if(sortedWallet) return res.send({success: true,data:sortedWallet, message:'wallets retrieved successfully', data: sortedWallet})
    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
const getWalletsBalanceById = async(req, res)=>{
    
    const Id = req.params.id
    const sortedWallet = await WalletTable.findByPK( {where: {Id}})
    try{
     if(sortedWallet) return res.send({success: true,data:sortedWallet.balance, message:'wallets retrieved successfully', data: sortedWallet})
    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

//3. get all wallets

const getAllWallets = async(req, res)=>{
    const allWallets = await WalletTable.findAll()
    if(allWallets) return res.send({success: true, data:allWallets,message:'wallets retrieved successfully', data: allWallets})
}

//4. update  wallet

const debitWallet = async (req, res)=>{
    var info = {
        userId:req.body.userId,
        } 
    
    const Id = req.params.id;
    const {amount,description,transactionPurpose,beneficiaryName, beneficiaryAccount} =req.body
    // const { balance, userId }= req.body
    const sortedWallet = await WalletTable.findByPK(Id)
    
    try{
        const updatedWallet =  sortedWallet.balance -= parseFloat(amount)
        if(updatedWallet){
                await updatedWallet.save()
                res.status(200).send({
                success:true,
                data: updatedWallet,
                message: 'wallet balance is successfully debited',
                });
            }
            await transaction.create({
                walletId : sortedWallet.Id,
                transAmount: amount,
                trnsactionType: 'debit',
                description: description,
                transPurpose: transactionPurpose,
                beneficiaryName: beneficiaryName,
                beneficiaryAccount:beneficiaryAccount,
            })
        }catch(error){
        res.status(500).send({
            success:false,
            message:error.message
        })
    }

}
const creditWallet = async (req, res)=>{
    var info = {
        userId:req.body.userId,
        } 
    
        const Id = req.params.id;
        const {amount} =req.body
        // const { balance, userId }= req.body
        const sortedWallet = await WalletTable.findByPK(Id)
        
        try{
            const updatedWallet =  sortedWallet.balance += parseFloat(amount)
            if(updatedWallet){
                    await updatedWallet.save()
                    res.status(200).send({
                    success:true,
                    data: updatedWallet,
                    message: 'wallet balance is successfully credited',
                    });
                }
                await transaction.create({
                    walletId : sortedWallet.Id,
                    transAmount: amount,
                    trnsactionType: 'credit',
                    description:' wallet funded successfully',
                })
        }catch(error){
        res.status(500).send({
            success:false,
            message:error.message
        })
    }

}

const topUpTrf = async (req, res) =>{
    try {
        await sequelize.transaction(async(t) =>{
            //withdraw from account A

        })
    } catch (error) {
        
    }
}

//5. delete wallets
const deleteWallet = async (req, res)=>{
    var info = {
        balance:req.body.balance,
    } 
    
    Id = req.params.id;
    // const { balance, userId }= req.body
    const sortedWallet = await WalletTable.findByPK( {where: {Id}});
    
    try{
        const deletedWallet = await sortedWallet.destroy(sortedWallet);
        if(deletedWallet) res.status(200).send({
          success:true,
          message: 'wallet balance is successfully deleted',
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
}

module.exports= {
    deleteWallet,
    creditWallet,
    debitWallet,
    createWallet,
    getWalletsById,
    getWalletsBalanceById,
    getAllWallets,
    topUpTrf,
}

