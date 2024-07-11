const accountTypeController =  require('../controllers/accountTypeController.js');
const accTypeRouter = require('express').Router();

accTypeRouter.post('/addAccountType', accountTypeController.addAccountTypeCustomer);

accTypeRouter.get('/allAccountType', accountTypeController.getAllAccountType);

accTypeRouter.get('/getAccounttypeCustomer', accountTypeController.addAccountTypeCustomer)


accTypeRouter.get('/:id', accountTypeController.getAccountTypebyId);

accTypeRouter.put('/:id', accountTypeController.updateAccountTypebyId);

accTypeRouter.delete('/:id', accountTypeController.deleteAccountTypebyId);




module.exports = accTypeRouter;