const mongoose = require('mongoose'); //Importing Mongoose 
const validator = require('validator'); // For validating login & registration
const bcrypt = require('bcryptjs'); // For Hashing passwords
const jwt = require('jsonwebtoken'); // Importing JWT

// Mailgun for Forgot Password Mail

const mailgun = require('mailgun-js')({
    apiKey: 'pubkey-a4227a65e466841ab540c1b02d362f6d',
    domain: 'sandboxb60c058465804065bb1c4c58d505e807.mailgun.org',
});

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

    profileImage : {
        type:String
    },

    gender:{
        type: String,
        required: true,
        enum: ['male', 'female'],
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
        enum: [
            "What is the name of your first crush?",
            "Who's your favourite communist?",
            "What is your mother's maiden name?",
            "Which fictional character would you like to meet in real life?",
            "What's the weirdest job you've ever had or wanted?",
            "What's the weirdest thing you've ever eaten?",
            "What's your favorite movie quote?",
            "If you could have dinner with any historical figure, who would it be?",
            "What's the most bizarre food combination you secretly enjoy?",
            "What is your biggest weakness?",
            "If you had to live in a fictional world from a book, game, or movie, which one would it be?",
            "What is your favorite childhood place to visit?",
            "What is your favorite childhood actor or actress?",
            "What's your secret guilty pleasure TV show?",
            "What's the oddest phobia you have?",
            "What's the most unusual thing you've ever won in a contest?",
            "If you could have any mythical creature as a pet, what would it be?"
        ],
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

}],

resetPasswordToken: String,
resetPasswordExpires: Date,

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

// Password Reset

registrationSchema.methods.generatePasswordReset = async function() {
    const resetToken = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY, {
      expiresIn: "1h", // Set the token to expire in 1 hour
    });
  
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await this.save();
  

    //  nodemailer code:
    
    const nodemailer = require('nodemailer');

    const resetLink = `http://localhost/forgotPassword/${resetToken}`; // Need to update with actual URL
    const data = {
        from: '', // Replace with your sender email
        to: this.email,
        subject: 'Password Reset',
        html: `<p>To reset your password, click the following link:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    mailgun.messages().send(data, function(error, body) {
        if (error) {
            console.log(error);
        } else {
            console.log('Password Reset Email sent:', body);
        }
    });
    
  };
  

const registrationData = new mongoose.model("registrationData",registrationSchema);

// Exporting Module
module.exports = registrationData;
