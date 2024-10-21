const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator')
const bodyParser = require('body-parser')
const { where } = require('sequelize');
const db = require('../models');

const registerUser = async (req, res) => {
  try {

    // Input validation

    // if (!email || !password || !firstname || !lastname || !phoneNumber) {
    //   return res.status(400).json({ message: "All fields are required", success: false });
    // }

    //validation from validation middleware

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    const { 
      firstname,
      lastname,
      phoneNumber, 
      password, 
      address, 
      email 
      } = req.body;

    // Duplicate User check 
    const alreadyExistUser = await db.models.User.findOne({ where: { email } });
    if (alreadyExistUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(process.env.bcryptSaltRounds); //dynamically retrieved salt round value

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await db.models.User.create({
      firstname,
      lastname,
      phoneNumber,
      password: hashedPassword, // Only save hashed password
      address,
      email,
    });

    // Save the user
    const savedUser = await newUser.save().catch(err => {
      return res.status(500).json({ message: 'Cannot register user at the moment', success: false });
    });

    // Respond to successful registration
    if (savedUser) {
      return res.status(201).json({
        message: "Thanks for registering, user saved successfully",
        data: null, // Don't expose sensitive info
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//Getting all registered users
// This API endpoint would only be available to admin users 

const getAllRegistrations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination params (default to page 1, limit 10)
    const offset = (page - 1) * limit;

    // Fetch users without sensitive information
    let registeredUsers = await db.models.User.findAll({
      attributes: ['id', 'firstname', 'lastname', 'email', 'phoneNumber', 'address'],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    console.log(`API hit: ${registeredUsers.length} users fetched`);
    return res.status(200).json({
      message: 'Users fetched successfully',
      success: true,
      data: registeredUsers,
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return res.status(500).json({
      message: 'Unable to fetch users',
      success: false,
    });
  }
};


//Login Logics

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation (add more checks as needed)


    // if (!email || !password) {
    //   return res.status(400).json({ message: 'Email and password are required' });
    // }
    //OR
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const payload = {
      user: {
        id: user.id,
        username: user.email
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with token
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
    });
  } catch (error) {
    // Consistent error response
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};





module.exports = { registerUser, login, getAllRegistrations };