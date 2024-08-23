const { verify } = require('jsonwebtoken');
const { Users } = require("../models");
const { UserError } = require('../errors/UnauthenticationError');


const auth = async(req, res, next) =>{
    //const { authorization } = req.headers;
    //console.log('Request Headers:', req.headers);
    const token = req.headers['accesstoken'];
    //console.log(token);
    //console.log(authorization);
    if (!token) {
        return res.status(401).json({ 
            error: "Unauthorized",
            message: "Please Login First" });
    }

    try {
        //const [type, token] = authorization.split(" ");
        //console.log(token);
        const decode = verify(token, process.env.JWT_SECRET);
        console.log(decode);
        const user = await Users.findOne({email: decode.email});
        if (!user) throw new UserError();
    } catch (error) {
        return res.status(401).json( {message: "Invalid Token"});
    }

    next();
}

module.exports = auth;