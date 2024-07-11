const jwt = require('jsonwebtoken') 

//decrypting token

module.exports = (req, res, next)=>{
    const token =req.header('x-auth-token');
    if(!token){
        return res.status(404).json({message: 'No token, authorization denied'})
    }
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)   
        req.user = decoded.user;     
    } catch ( err) {
        res. status(401).json({message: 'token is not valid'})   
    }

}