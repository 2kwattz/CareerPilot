const mongoose = require('mongoose'); //Importing Mongoose 
const validator = require('validator'); // For validating login & registration
const bcrypt = require('bcryptjs'); // For Hashing passwords
const jwt = require('jsonwebtoken'); // Importing JWT

// Registration Schemas

const registrationSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required : true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[50, "Full Name cannot exceed more than 50 characters"],
        
      
    },

    gender:{
        type: String,
        // required: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[50, "Full Name cannot exceed more than 50 characters"],
        lowercase: true,
        trim: true,
    },

    city:{
        type:String,
        // required: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[50, "Full Name cannot exceed more than 50 characters"],
        lowercase: true,
        trim: true,
    },

    state:{
        type:String,
        // required: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[50, "Full Name cannot exceed more than 50 characters"],
        lowercase: true,
        trim: true,
    },

    country:{
        type:String,
        // required: true,
        minlength: [2, "Minimum length should be 2 characters"],
        maxlength:[50, "Full Name cannot exceed more than 50 characters"],
        lowercase: true,
        trim: true,
    },

    semester:{
        type:Number,
        lowercase: true,
        trim: true,

    },

    interests:{
        type:String,
        lowercase: true,
        trim: true,
    },

    currentStatus:{
        type:String,
        lowercase: true,
        trim: true,
    },

    email:{
        type: String,
        required : true,
        unique: true,
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
        trim: true,
        minlength: [5, "Minimum length of the Password should be 5 characters"],
        maxlength:[150, "Password cannot exceed more than 50 characters"],
     
    },

    confirmPassword:{
        type:String,
        // required: true,
        trim: true,
        minlength: [5, "Minimum length of the Password should be 5 characters"],
        maxlength:[150, "Password cannot exceed more than 50 characters"],

        
    },

    age: {
        type: Number,
        required: true,
    },

    collegeName: {
        type: String,
        required: true,
    },

    collegeBranch: {
        type: String,
        // required: true,
    },

    collegeCourse:{
        type: String,
        required: true,
    },

    secQuestion:{
        type: String,
        required: true,
    },

    secQuestionAnswer:{
        type:String,
        required: true,
    },

    //Additional code

    isVerified:{
        type: Boolean,

    },

  tokens:[{
    token:{
        type:String,
        required: true
    }

}]

})

// Generating tokens

registrationSchema.methods.generateAuthToken = async function(){

    try{

        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY); // Creating a signed token with secret key from .ENV 
        this.tokens = this.tokens.concat({token:token}); // Storing the token values in token field of reg collection
        console.log(` generated updated token ${token}`);
        await this.save();
        console.log("generate auth token stage reached\n");
        return token
      

    }
    catch(error){

        console.log(error);
        throw error;
   
    }
}

// Hashing the password using bycrypt before executing save() function

registrationSchema.pre("save", async function (next){

    if(this.isModified("password")){

        // const passwordHash = await bcrypt.hash(password, 10);
        console.log(`The current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`The current password is ${this.password}`);

        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
        next();
    }
})

const registrationData = new mongoose.model("registrationData",registrationSchema);

// Exporting Module
module.exports = registrationData;
