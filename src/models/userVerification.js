const mongoose = require('mongoose'); //Importing Mongoose 
const validator = require('validator'); // For validating login & registration
const bcrypt = require('bcryptjs'); // For Hashing passwords
const jwt = require('jsonwebtoken'); // Importing JWT
const nodemailer = require('nodemailer');

// Registration Schemas

const verificationSchema = new mongoose.Schema({

    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,

    //Additional code

    isVerified:{
        type: Boolean,

    },

})

const userVerification = new mongoose.model("verificationData",UserVerificationSchema);

// Exporting Module
module.exports = verificationData;
