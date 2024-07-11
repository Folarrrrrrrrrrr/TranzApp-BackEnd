const customerAccount = require ('../controllers/customerAccount.Controller.js')
const router = require('express').Router();


// This is the  customer accounts api router

router.post('/addAccount', customerAccount.addCustomerAcc);
router. get('/getAccounts', customerAccount.getAllAccounts);

router.get('/:id', customerAccount.getAccountsByPK);
router.put('/:id', customerAccount.updateAccountsByPK);
router.delete('/:id', customerAccount.deleteAccountsByPK);




module.exports = router;