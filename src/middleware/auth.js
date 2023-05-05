const jwt = require("jsonwebtoken"); //Importing JWT Tokens
const registrationData = require("../models/registration"); //Importing Registration Page Models & Schemas

const auth = async function(req,res, next){

    try{
        console.log("Dashboard Page reached\n");
        const token = req.cookies.jwtLogin;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Dashboard Route Reached\n");
        next();


    } catch(error){

        res.status(401).send(error);
    }
}

module.exports = auth;