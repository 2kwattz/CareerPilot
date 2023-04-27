const express = require("express");
const router = new express.Router(); 

router.get("/registration", function(req,res){
    res.render("registration")
});

module.exports = router;