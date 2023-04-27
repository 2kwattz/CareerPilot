// Adding DOTENV for extra layer of security

const dotenv = require('dotenv').config();

const express = require('express'); // NodeJs Framework
const mongoose = require("./db/conn");
const http = require('http'); // Default http module 
const axios = require('axios'); // Https Request Maker
const request = require('request'); // Web Scraping Tool 1
const cheerio = require('cheerio'); // Selector for Web Scraping
const puppeteer = require('puppeteer'); // Web Scraping Tool 2
const hbs = require('hbs'); // Importing Template Engine HBS

// Defining paths 
const path = require('path'); // for defining  static and template paths
const staticPath = path.join(__dirname, "../public/");  // Used for Template Engine
const partialsPath = path.join(__dirname, "../templates/partials"); // Used for Template Engine

const bodyParser = require('body-parser');  // For getting Web Form Data
const fs = require('fs'); // For managing files
const ObjectId = mongoose.Types.ObjectId; // Specifically for /login/:api route
const app = express();

// Fetching country-state-city for Registration 

const country  = require('country-state-city').Country;
const state = require('country-state-city').State;
const city = require('country-state-city').City;

// BCrypt Hashing Algorithm for Security

const bcrypt = require('bcryptjs'); 

// Hashing Password

const securePassword = async function(password){

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(` Bycrypt Password Hash Test ${passwordHash}`);

    const passwordMatch = await bcrypt.compare("randompassword", passwordHash);
    console.log(` Verifying Bycrypt Password Match ${passwordMatch}`);
}

securePassword("roshanisdashing"); // Just an example to see if its working or not!!

// JWT Tokens for authentication and verifying users identity
const jwt = require('jsonwebtoken'); // Importing JWT Library

//  Creating a new router
const router = new express.Router();

// Defining the router
const registrationRouter = require("./routers/signup.js");

// Registering the router
app.use(router);



const port = process.env.PORT || 80; // Server Port Number

// Database Code stored in /src/conn.js

// Importing Database Schemas
const loginData = require('./models/login')
const feedbackData = require('./models/feedback')
const registrationData = require('./models/registration');

// Initializing Middlewares

app.use(express.static(staticPath)); // Defining path for static HTML,CSS and Javascript files
hbs.registerPartials(partialsPath);
app.use(bodyParser.urlencoded({ extended: false})); //Middlewares for parsing the request body
app.use(bodyParser.json());

// Path to Views Directory 
app.set('views', './templates/views');
app.set('view engine', 'hbs');

// Initalize Scrapers

const scholarshipWebsites = [
    {
        name: "National Scholarship Portal of India",
        url: "https://scholarships.gov.in/",
        selectors:{
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },
]

console.log(`Verifying SECRET_KEY functionality by simply pasting it here... ${process.env.SECRET_KEY}\n`);

// Routes

router.get("/", function(req,res){
    res.render("index");
    app.set('title', 'CareerPilot : Home Page');
});

router.get("/signup", function(req,res){
    res.status(200).send("test");
});

router.post("/internships", function(req,res){
    let internshipKeyword = req.body.internshipSearch;
    console.log(internshipKeyword);

    // LinkedIn Scrapping

    let linkedinSource = `https://www.linkedin.com/jobs/search/?currentJobId=3569088404&f_JT=I&geoId=102713980&keywords=${internshipKeyword}&location=India&originalSubdomain=in&refresh=true`;
    request(linkedinSource,callback);
    
    // Scrapping Internship Data

    function callback(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            
            handelHtml(html);
        }
    }

    function handelHtml(html){
        const $ = cheerio.load(html);
        const lnInternshipsTitleArray = $('.jobs-search__results-list .base-search-card__title');

        try{
            fs.writeFileSync(lnInternshipsTitleArray.text(), "Internship.txt");
            console.log(lnInternshipsTitleArray);  
        }

        catch(error){
            res.send(error);
        }
    }
})

router.get("/internships", function(req,res){
    console.log(req);
    res.status(200).render("internships");
});

router.get("/certifications", function(req,res){
    console.log(req);
    res.status(200).render("certifications");
});

router.get("/grants", function(req,res){
    console.log(req);
    res.status(200).render("grants");
});

router.get("/jobs", function(req,res){
    console.log(req);
    res.status(200).render("jobs");
});

router.get("/hackathons", function(req,res){
    console.log(req);
    res.status(200).render("hackathons");
});

app.get("/feedbackPage", function(req,res){
    res.status(200).render("feedback");
});

app.post("/feedback", function(req,res){
    const feedback = new feedbackData(req.body);
    feedback.save().then(function(){
        const feedbackResponse = `Thank you for your valuable feedback!! `;
        res.status(201).render("feedback");
    }).catch(function(error){
        res.status(400).send(error);
    }) 
});

app.post("/scholarships", function(req,res){
    
});

app.get("/scholarships", function(req,res){
    console.log(req);
    res.status(200).render("scholarships");
});

app.get("/faq", function(req,res){
    console.log(req);
    res.status(200).render("faq");
});

app.get("/contactus", function(req,res){
    console.log(req);
    res.status(200).render("contactus");
});

app.post("/contactus", function(req,res){
    console.log(req);
    res.status(200).send("Still in construction...")
});

app.get("/services", function(req,res){
    console.log(req);
    res.status(200).render("services");
});

// Generalized Pages

// Login and registration

app.get('/loginPage', function(req,res){
    res.render("loginPage");
});

app.post('/login', async function(req,res){

    try{

        //  Storing users login data from login page 
        const email = req.body.email;
        const password = req.body.password;
        const emailIsMatch = await registrationData.findOne({email}); //Verfying Email from Database 
        // verifiedEmail.password === password && verifiedEmail.email === email? res.status(201).render("index"):res.status(400).send("Invalid Login Details\n");

        const passwordIsMatch = await bcrypt.compare(password, emailIsMatch.password); // Verifying Password from Databases

        // Generating tokens via middleware

        const token = await emailIsMatch.generateAuthToken();
        console.log("Email JWT Token is generated via route/login. Token << "+token);
        
        if(passwordIsMatch){
            res.status(201).render("index");
        }

        else{
            res.send("Invalid Login Details");
        }
    }

    catch (error){
        res.status(400).send(error);
    }
    
    // const user = new loginData(req.body);
    // user.save().then(function(){
    //     res.status(201).send(user);
    // }).catch(function(error){
    //     res.status(400).send(error);
    // })
    // console.log(user);
});

app.get('/registration', function(req,res){
    res.render("registration");
});

app.post('/registration', async function(req,res){

    // Create a new user in our database

    try{
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password === confirmPassword){

           const registerUser = new registrationData({
            fullName: req.body.fullName,
            email: req.body.email,
            gender: req.body.gender,
            age: req.body.age,
            password: password,
            confirmPassword: confirmPassword,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            semester: req.body.semester,
            currentStatus: req.body.currentStatus,
            secQuestion: req.body.secQuestion,
            secQuestionAnswer: req.body.secQuestionAnswer,
            collegeCourse: req.body.collegeCourse,
            collegeName: req.body.collegeName,
            collegeBranch: req.body.collegeBranch,
           });

           console.log(registerUser)

           // JWT Token middleware

            const token = await registerUser.generateAuthToken();
            console.log("The token part is "+token);
           
           // Password Hash Middleware

           const registered = await registerUser.save();
           res.status(201).render("index");
        }

        else{
           res.send("Passwords are not matching\n")
        }
    }
    catch(error){

        res.status(400).send(error);
    }
        // newUser.save().then(function(){
        //     res.status(201).send(newUser);
        // }).catch(function(error){
        //     res.status(400).send(error);
        // });

});

router.get("/carreradvice", function(req,res){
    res.render("carreradvice");
})

// RESTFUL API for data

// Users Login Data

app.get("/login", async function(req,res){

    try{
        const usersData = await loginData.find()
        res.send(usersData);
    }
    catch(error){
        res.send(error)
    }
})

// Get user's data by ID

app.get("/login/:id", async function(req, res){
    try{
        // const _id = mongoose.Types.ObjectId(req.params.id);
        const objectId = ObjectId(_id);
        const studentData = await loginData.findById(objectId);
        if(!studentData){
            return res.status(404).send(`error`);
        }
        else{

            res.send(studentData);
            console.log('done');
        }
    } catch(error){
        res.status(500).send(error);
    }
});

router.get("/reportproblem", function(req,res){
    res.render("reportproblem");
})

//  404 error page

app.get('*', function(req,res){
    res.status(404).render("404error", {
      errorComment : "Not found"  
    });
})


// Server Listen

app.listen(port, function(){
    console.log(`The server has started. Listening on port ${port}`);
})