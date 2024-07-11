module.exports ={
    HOST: 'localhost',
    USER: 'root',
    PASSWORD:'heryourthormeewah',
    DATABASE:'transact',
    dialect:'mysql',
    pool:{
        max: 5,
        min: 0,
        acquire:30000,
        idleTime: 10000
    }
}
// const { Console } = require('console')
// const mongoose = require('msongoose')


// mongoose.connect(process.env.mongo_url)

// const connectionResult = mongoose.connection;

// connectionResult.on('error', ()=>{
//     console.log(console, 'connection error');
// });
// connectionResult.on('connected', () =>{
//     console.log(console, 'Mongodb connection successful');
// });
// connectionResult.on

// module.exports = connectionResult;