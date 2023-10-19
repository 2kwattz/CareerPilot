
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
       

        req.token = token;
        req.user = user;

        const userName = user.fullName;

        next(); // Mandatory to call
    } catch(error){
       
        // res.status(401).send(error);

        let loginErrorIfAny = {
            errorName : `${error.name}`,
            errorMessage : `${error.message}`,
        };

        if(loginErrorIfAny.errorName == `JsonWebTokenError`){

            loginErrorIfAny = `You must log in first\n\n`;
        }
      
        res.status(401).render("login2", {loginErrorIfAny});
    }
}



module.exports = auth;