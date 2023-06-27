// Database connection modules
const mongoose = require('mongoose'); //Importing Mongoose 


mongoose.connect(`${process.env.LOCAL_CONN}`, { useNewUrlParser: true, useUnifiedTopology: true}) //Default Address of Database
.then(function(){
    console.log("Database connected successfully...\n")
})
.catch(function(error) {
    console.log(error);
  });

  module.exports = mongoose;
