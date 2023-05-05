
const jwt = require("jsonwebtoken"); //Importing JWT Tokens
const loginData = require("../models/login");
const registrationData = require("../models/registration");

// const registrationData = require("../models/registration"); //Importing Registration Page Models & Schemas

const auth = async function(req,res, next){

    try{
        console.log("Dashboard Page reached\n");
        console.log(req.cookies);
        const token = req.cookies.login; // Storing user's token in a variable
        console.log(` Cookies token dashboard ${token}`)
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY); // Authenticating user's token with the one stored 
        console.log(verifyUser);
        console.log("Dashboard Route Reached\n");
        const user = await registrationData.findOne({_id:verifyUser._id});
        console.log(user.fullName);

        req.token = token;
        req.user = user;

        next(); // Mandatory to call
    } catch(error){
        res.status(401).send(error);
    }
}



module.exports = auth;