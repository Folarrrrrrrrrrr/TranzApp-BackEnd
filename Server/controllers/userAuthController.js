const router = require("express").Router();
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const db = require ('../models/index')
const  bodyParser =require('body-parser')
const { where } = require('sequelize');
const db = require('../models') ;

//Accounts registration

// router.post("/register", async (req, res) => {
// const register= async (req, res) => {
//   try {

//     const {firstname, 
//       lastname,
//       phoneNumber,
//       identificationNumber,
//       identificationType,
//       password,
//       address,
//       email,
//       balance
//     } = req.body

//     //checking duplicate user, if user is existing before saving user again
//     const User = await db.models.User.findOne({ where: {email: req.body.email}});
//     if (User) {
//       return res.send({
//         success: false,
//         message: "user already exists",
//       });
//     }
    
    
//     //hashing the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     // req.body.password = hashedPassword;

//     // const newUser = new User(req.body);
//     // const newUser = await new db.models.User.create(req.body);
//     const newUser = await db.models.User.create({
//       firstname,
//       lastname,
//       phoneNumber,
//       identificationNumber,
//       identificationType,
//       password: hashedPassword,
//       isVerified,
//       address,
//       email,
//       balance: {
//         type: Number,
//         default: 0
//     }
//   });
//     await newUser.save();

//     res.send({
//       message: "user saved successfully",
//       data: null, // we are setting data to null here because we dont want to send the password to the frontend
//       success: true,
//     });
//   } catch (error) {
//     res.send({
//       message: error.message,
//       success: false,
//     });
//   }
// // });
// }
const register = async (req, res) => {
  try {

    const {
      firstname, 
      lastname,
      phoneNumber,
      identificationNumber,
      identificationType,
      password,
      address,
      email,
      balance,
    } = req.body

    //checking duplicate user, if user is existing before saving user again
    const alreadyExistUser = await db.models.User.findOne({ where: {email}});
    if (alreadyExistUser) {
      return res.send({
        success: false,
        message: "user already exists",
      });
    }
    
    
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // req.body.password = hashedPassword;

    // const newUser = new User(req.body);
    // const newUser = await new db.models.User.create(req.body);
    const newUser = await db.models.User.create({
      firstname,
      lastname,
      phoneNumber,
      password,
      identificationNumber,
      identificationType,
      password: hashedPassword,
      isVerified,
      address,
      email,
      balance
    });
    
    try {
      const savedUser = await newUser.save()
    } catch (err) {
      console.log("Error: ", err);
      res.json({err:'Cannot register user at the moment'})
    }

    if (savedUser)res.send({
      message: "Thanks for registering, user saved successfully",
      data: null, // we are setting data to null here because we dont want to send the password to the frontend
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
// });
}

 
const getAllRegistrations = async (req, res)=>{
let registeredUsers = await db.models.User.findAll({})
console.log('Congrats API has been hit')
res.status(200).send({
  message: 'welcome',
  success: true
});
};

//Login Logics

// router.post("/login", async (req, res) => {
  
const login = async (req, res) => {

  try {
    const { email, password} = req.body;

    //checking for user existence using the imputed email for the checks
    let user = await User.findOne({where:{email: email} });
    if (!user) {
      // return res.send({
      //   success: false,
      //   message: "user does not exist",
      // });
      return res.status(404).json({message: 'user not found'});
    }

    //after user existence true and email exists in the first statement and checking if imputed password matches
    const validPassword = await bcrypt.compare(password,user.password);
    if (!validPassword) {
      // return res.send({
      //   success: false,
      //   message: "invalid password",
      // });
      return res.status(400).json({message: 'invalid credentials'});
    }

    //Generate token

    const payload ={
      user: {
        id: user.id,
        username: user.email
      }
    };
    const token = jwt.sign(payload, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    res.send({
      success: true,
      message: "User logged in succesfully",
      data: token,
    });
  } catch (error) {
    res.send({
        message: error.message,
        success: false,
    })
  }
// });
}



module.exports= {register, login,getAllRegistrations};