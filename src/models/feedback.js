const mongoose = require('mongoose'); //Importing Mongoose 
const validator = require('validator'); // For validating login & registration


// Feedback Schemas

const feedbackSchema = new mongoose.Schema({
    feedbackForm : {
        type: String,
        required : true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[50, "Length cannot exceed more than 50 characters"]
    },

    email : {
        type: String,
        required : true,
        lowercase: true,
        trim: true,
        minlength: [4, "Minimum length should be 4 characters"],
        maxlength:[50, "Length cannot exceed more than 50 characters"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address");
            }
        }
    },

    fullName : {

        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[50, "Length cannot exceed more than 50 characters"]

    }
});

const feedbackData = new mongoose.model("feedbackData",feedbackSchema);

module.exports = feedbackData;
