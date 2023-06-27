// Database connection modules
const mongoose = require('mongoose'); //Importing Mongoose 
require('dotenv').config(); // For defining environment variables


mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.vmilsjg.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true}) //Default Address of Database
.then(function(){
    console.log("Database connected successfully...\n")
})
.catch(function(error) {
    console.log(error);
  });

  module.exports = mongoose;
