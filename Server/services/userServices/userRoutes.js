const userRouter = require("express").Router();
const userController = require('../userServices/userControllers');
const SignUpFormValidate = require('../../middleware/signUpFieldsValidation')


userRouter.post('/addUser', SignUpFormValidate,  userController.registerUser);
userRouter.get('/registeredUsers', userAuth.getAllRegistrations);
userRouter.post('/login', userAuth.login);



module.exports = userRouter;
