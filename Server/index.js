const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./models')
require ('dotenv').config();


//Initializing express

const app = express();

//setting up cors
const corsOptions = {
    credentials: true,
    origin:['http://localhost:7777', 'http://localhost:5173']
};


// const dbConfig = require('./config/dbConfig');


//setting up middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions));


//setting up routes

const userRouter = require('./services/userServices/userRoutes')
const accTypeRouter = require('./routes/accountTypeRoutes')
const customerAccountRoutes = require('./routes/customerAccountRoutes')
// const customerAccountRoutes = require('./routes/customerAccountRoutes')
// const router = [accountTypeRoutes, customerAccountRoutes, userRoute,tiertypeRoutes]
// const allRegisteredUsers = require('./controllers/userAuthController/')


// app.use(allRegisteredUsers);
app.use(userRouter);
app.use(accTypeRouter);
// app.use(tiertypeRoutes);
// app.use(customerAccountRoutes);

// const jwt = require ('jsonwebtoken');
// const router = require('./routes/usersRoutes');
// const userRouters = require('./routes/usersRoutes');

// const auth =()=>{
//     const token = req.header('x-auth-token');

//     if (!token){
//         return res.sta
//     }

// }


const { Sequelize } = require('sequelize');
(async ()=>{
    await db.sequelize.sync();
    console.log('Database synchronization successful')
})();

const PORT = process.env.PORT || 5006;




app.listen(PORT, ()=>{
    console.log(`Server is running in port: ${PORT}`)
})