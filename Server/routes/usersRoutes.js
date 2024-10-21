const userRouters = require("express").Router();
const express = require("express");
const userAuth = require('../controllers/userAuthController');

userRouters.post('/register', userAuth.register);
userRouters.get('/registeredUsers', userAuth.getAllRegistrations);
userRouters.post('/login', userAuth.login);

module.exports = userRouters;




// const router = require("express").Router();
// const User = require("../models/usersModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const db = require ('../models/index')
// const  bodyParser =require('body-parser')


 
// const getAllRegistrations = async (req, res)=>{
// let registeredUsers = await db.models.User.findAll({})
// res.status(200).send({
//   message: 'welcome',
//   success: true
// });
// };

//Login Logics

// router.post("/login", async (req, res) => {
// const login = async (req, res) => {
//   const {email, password} = req.body;

//     //checking for user existence using the imputed email for the checks
//     let userEmail = await User.findOne({where:{email} }).catch(err =>{
//       console.log('Error: ', err);
//     });
//     if (!userEmail) {
//       return res.send({
//         success: false,
//         message: "Email or password does not match",
//       });
//     }
//     if (userEmail.password !== password ) {
//       return res.send({
//         success: false,
//         message: "Email or password does not match",
//       });
//     }



//     //after user e.helpxistence true and email exists in the first statement and checking if imputed password matches
//     const validPassword = await bcrypt.compare(
//       password,
//       User.password
//     );
//     if (!validPassword) {
//       return res.send({
//         success: false,
//         message: "invalid password",
//       });
//     }

//     //Generate token
//     const token = jwt.sign({ userId: User._id, email: User.email }, process.env.jwt_secret);
//     res.send({
//       success: false,
//       message: "Welcome back!",
//       data: token,
//     });
//    } 
  //catch (error) {
  //   res.send({
  //       message: error.message,
  //       success: false,
  //   })
  // }
// });
// }
// module.exports = userRouters;
// module.exports= {register, login,getAllRegistrations};