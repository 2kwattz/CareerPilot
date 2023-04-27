const mongoose = require('mongoose'); //Importing Mongoose 
const validator = require('validator'); // For validating login & registration


//   Login Schemas
const loginSchema = new mongoose.Schema({

    email : {

        type: String,
        required : true,
        // unique: true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum length of the Email should be 2 characters"],
        maxlength:[50, "Email cannot exceed more than 50 characters"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address");
            }
        }
    },
    password : {
        
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [5, "Minimum length of the Password should be 5 characters"],
        maxlength:[50, "Password cannot exceed more than 50 characters"],
        // validate(value){
        //     if(value)
        // }
    },

    active: Boolean
});


// Exporting Module

// Mongoose Models for providing interface

const userLogin = new mongoose.model("userLogin",loginSchema);

module.exports = userLogin;

