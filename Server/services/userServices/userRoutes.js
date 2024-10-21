const userRouter = require("express").Router();
const userController = require('../userServices/userControllers');
const SignUpFormValidate = require('../../middleware/signUpFieldsValidation')


UserRouter.post('/addUser', SignUpFormValidate,  userController.registerUser);
userRouters.get('/registeredUsers', userAuth.getAllRegistrations);
userRouters.post('/login', userAuth.login);



module.exports = userRouter;
