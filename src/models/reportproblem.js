const mongoose = require('mongoose'); //Importing Mongoose 
const validator = require('validator'); // For validating login & registration
const bcrypt = require('bcryptjs'); // For Hashing passwords
const jwt = require('jsonwebtoken'); // Importing JWT


// Report a Problem Schema

const reportProblemSchema = new mongoose.Schema({
    issue : {
        type: String,
        required : true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[100, "Length cannot exceed more than 50 characters"]
    }
})