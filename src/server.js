// Adding DOTENV for extra layer of security

const dotenv = require('dotenv').config();

const express = require('express'); // NodeJs Framework
const mongoose = require("./db/conn"); // 
const http = require('http'); // Default http module 
const axios = require('axios'); // Https Request Maker
const request = require('request'); // Web Scraping Tool 1
const cheerio = require('cheerio'); // Selector for Web Scraping
const puppeteer = require('puppeteer'); // Web Scraping Tool 2
const hbs = require('hbs'); // Importing Template Engine HBS

// Defining paths 
const path = require('path'); // for defining  static and template paths
const staticPath = path.join(__dirname, "../public/");  // Used for Template Engine
const partialsPath = path.join(__dirname, "../templates/views/partials"); // Used for Template Engine

const bodyParser = require('body-parser');  // For getting Web Form Data
const fs = require('fs'); // For managing files
const ObjectId = mongoose.Types.ObjectId; // Specifically for /login/:api route
const app = express();

// Fetching country-state-city for Registration 

const country = require('country-state-city').Country;
const state = require('country-state-city').State;
const city = require('country-state-city').City;

// BCrypt Hashing Algorithm for Security

const bcrypt = require('bcryptjs');

// JWT Tokens for authentication and verifying users identity
const jwt = require('jsonwebtoken'); // Importing JWT Library

// Cookie Parser for JWT Token Authentication

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Initializing CookieParser Middleware


// Hashing Password

const securePassword = async function (password) {

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(` Bycrypt Password Hash Test ${passwordHash}`);
    
    const passwordMatch = await bcrypt.compare("randompassword", passwordHash);
    console.log(` Verifying Bycrypt Password Match ${passwordMatch}`);
}

securePassword("roshanisdashing"); // Just an example to see if its working or not!!

// Nodemailer for verification mail

const nodemailer = require('nodemailer');

// API Based Modules

// const NewsAPI = require('newsapi');
// const newsApiKey = 'f44c13c30bee44fcbf221cfab8b8b428';
// const newsApiSend = new NewsAPI(newsApiKey);
// newsApiSend.v2.topHeadlines({
//     sources: 'bbc-news,the-verge',
//     q: 'IT Companies',
//     category: 'business',
//     language: 'en',
//     country: 'us'
//   }).then(response => {
//     console.log(response);
    
//       {
//         status: "ok",
//         articles: [...]
//       }
    
//   });

const port = process.env.PORT || 80; // Server Port Number

// Database Code stored in /src/conn.js

// Initializing Middlewares

app.use(express.static(staticPath)); // Defining path for static HTML,CSS and Javascript files
hbs.registerPartials(partialsPath);
app.use(bodyParser.urlencoded({ extended: false })); //Middlewares for parsing the request body
app.use(bodyParser.json());
// app.use(auth)

// Path to Views Directory 
app.set('views', './templates/views');
app.set('view engine', 'hbs');

// Importing Auth.js for Authorizing/Verifying User

const auth = require("./middleware/auth");

//  Creating a new router
const router = new express.Router();

// Defining the router
const registrationRouter = require("./routers/signup.js");
// Registering the router
app.use(router);

// Importing Database Schemas
const loginData = require('./models/login')
const feedbackData = require('./models/feedback')
const registrationData = require('./models/registration');
const { response } = require('express');

// Initalize Scrapers

const scholarshipWebsites = [
    {
        name: "National Scholarship Portal of India",
        url: "https://scholarships.gov.in/",
        selectors: {
            container: '.scholarship',
            name: '.scholarship-title',
            description: '.scholarship-summary',
            link: '.scholarship-cta a'
        }
    },
]

console.log(`Verifying SECRET_KEY functionality by simply pasting it here... ${process.env.SECRET_KEY}\n`);


// Routes

// Index Home Page

router.get("/", function (req, res) {
    res.render("index");
    app.set('title', 'CareerPilot : Home Page');
});

// Secret Pages ( Only for Authorized Users)

// DASHBOARD

router.get("/dashboard", auth , async function(req,res){
     console.log(`Cookie for Rohit Mehra. ${req.cookies.login}`)
     const userName = req.user.fullName.toUpperCase();

    //  News API for Dashboard Section 1
     const newsApiKey = `f44c13c30bee44fcbf221cfab8b8b428`;
     const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

     const newsResponse = await axios.get(newsApiUrl);

     const articleTitles = [];
  
     const apiResponseStatus = newsResponse.data.status;
     console.log(apiResponseStatus);
     
     var responseArray = [];
     
     const totalArticles = newsResponse.data.totalResults;
 
    // const at1 = newsResponse.data.articles[0].title;
    // const at2 = newsResponse.data.articles[1].title;
    // const at3 = newsResponse.data.articles[2].title;
    // const at4 = newsResponse.data.articles[3].title;

    // const articlesTitle = at1 + " \n" + at2 + " \n" + at3 + " \n" + at4;

    // console.log(articlesTitle)
    console.log(newsResponse.data.articles);
     
    res.render("dashboard", {userName, newsResponse});
})

router.get("/signup", function (req, res) {
    res.status(200).send("test");
});

router.get("/courses", function(req,res){
    res.status(200).render("courses")
})


router.get("/internships", function (req, res) {
    console.log(req);
    res.status(200).render("internships");
});

router.post("/internships", async function (req, res) {

    let internshipKeyword = req.body.internshipSearch;
    const jobLocation = req.body.location;
    console.log(internshipKeyword);

    // Array set of Internship Results

    const linkedinData = [];
    const internshalaData = [];
    

    // Internship Sources Object 

    const internshipSources = {

        linkedin: `https://www.linkedin.com/jobs/search?keywords=${internshipKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`,
        internshala: `https://internshala.com/internships/keywords-${internshipKeyword}/`,
        microsoft: `https://careers.microsoft.com/students/us/en/search-results?keywords=${internshipKeyword}`,

    }

    let linkedinSource = `https://www.linkedin.com/jobs/search?keywords=${internshipKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`;

   
    async function scrapLinkedin(){
        const response = await axios.get(internshipSources.linkedin);
        console.log(internshipSources.linkedin);
        const $ = cheerio.load(response.data);

        const linkedinInternships = $(".base-card");
        linkedinInternships.each(function(){
            title = $(this).find(".base-search-card__title").text();
            location = $(this).find('.job-search-card__location').text()
            listDate = $(this).find(".job-search-card__listdate").text()
            company = $(this).find(".base-search-card__subtitle").text()
            
            // link = $(this).find(".base-card__full-link").text()
            linkedinData.push(` Title ${title}, Location : ${location}, List Date ${listDate},Posted By ${company}`);
            
        })

        console.log(linkedinData);
    }
    
    // Internshala Scrapping

    async function scrapInternshala(){
        const response = await axios.get(internshipSources.internshala);
        const $ = cheerio.load(response.data);
        console.log(internshipSources.internshala);

        const internshalaInternships = $(".individual_internship");
        await internshalaInternships.each(function(){
            title = $(this).find(".company_and_premium").text();
            location = $(this).find('.location_link').text()
            // listDate = $(this).find(".job-search-card__listdate").text()
            // link = $(this).find(".base-card__full-link").text()
            internshalaData.push(` Title ${title}, Location : ${location}, List Date`);
            console.log(internshalaData);
            
        });
        
        // res.send(internshalaData);
    }
    
    await scrapInternshala();

    // Scrap Microsoft Carrers Website for Internship Lists

    async function scrapMicrosoft(){
        
        const response = await axios.get(internshipSources.microsoft);
        const $ = cheerio.load(response.data);
        
        const microsoftInternships = $('.phs-jobs-list');
        await microsoftInternships.each(function(){
            title = $(this).find().text();
        })
    }

    await scrapLinkedin();

    const internshalaPost = "<h1> Internshala Data </h1> \n " + internshalaData;
    const linkedinPost = " <h1> Linkedin Data </h1> \n" + linkedinData;  
    res.render("internships", {internshalaPost, linkedinPost});
    
})

router.get("/certifications", function (req, res) {
    console.log(req);
    res.status(200).render("certifications");
});

router.get("/grants", function (req, res) {
    console.log(req);
    res.status(200).render("grants");
});

router.get("/jobs", function (req, res) {
    console.log(req);
    res.status(200).render("jobs");
});

router.get("/hackathons", function (req, res) {
    console.log(req);
    res.status(200).render("hackathons");
});

app.get("/feedbackPage", function (req, res) {
    res.status(200).render("help/feedback");
});

app.post("/feedback", function (req, res) {
    const feedback = new feedbackData(req.body);
    feedback.save().then(function () {
        const feedbackResponse = `Thank you for your valuable feedback!! `;
        res.status(201).render("help/feedback");
    }).catch(function (error) {
        res.status(400).send(error);
    })
});

app.post("/scholarships", function (req, res) {

    // Scholarship Sources

    const scholarshipSources = {

        linkedin: `https://www.linkedin.com/jobs/search?keywords=${internshipKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`,
        internshala: `https://internshala.com/internships/keywords-${internshipKeyword}/`,
        microsoft: `https://careers.microsoft.com/students/us/en/search-results?keywords=${internshipKeyword}`,

    }


});

app.get("/scholarships", function (req, res) {
    console.log(req);
    res.status(200).render("scholarships");
});

app.get("/faq", function (req, res) {
    console.log(req);
    res.status(200).render("help/faq");
});

app.get("/contactus", function (req, res) {
    console.log(req);
    res.status(200).render("contactus");
});

app.post("/contactus", function (req, res) {
    console.log(req);
    res.status(200).send("Still in construction...")
});

app.get("/services", function (req, res) {
    console.log(req);
    res.status(200).render("services");
});

// Generalized Pages

// Login and registration

app.get('/loginPage', function (req, res) {
    res.render("loginPage");
});

app.post('/login', async function (req, res) {

    try {

        //  Storing users login data from login page 

        const email = req.body.email;
        const password = req.body.password;
        const emailIsMatch = await registrationData.findOne({ email }); //Verfying Email from Database 

        const passwordIsMatch = await bcrypt.compare(password, emailIsMatch.password); // Verifying Password from Databases

        // Generating tokens via middleware

        const token = await emailIsMatch.generateAuthToken();
        console.log("Email JWT Token is generated via route/login. Token << " + token);

        // Set Cookie based on jwt token

        res.cookie("login", token, {

            expires: new Date(Date.now() + 900000),  //  Test Cookie expires in 15minutes
            httpOnly: true,
            // secure: true
        });

        
        if (passwordIsMatch) {
            res.status(201).render("index");
            console.log(`Cookie for User Login Generated. ${req.cookies.login}`)
        }

        else {
            res.send("Invalid Login Details");
        }
    }

    catch (error) {
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

app.get('/registration', function (req, res) {
    res.render("registration");
});

app.post('/registration', async function (req, res) {

    // Create a new user in our database

    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password === confirmPassword) {

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
            console.log("The token part is " + token);

            // Set Cookie based on jwt token

            res.cookie("jwt_registration", token, {

                expires: new Date(Date.now() + 90000),  //  Test Cookie expires in sometime
                httpOnly: true
                // secure: true
            });

            // Password Hash Middleware

            const registered = await registerUser.save();
            res.status(201).render("index");
        }

        else {
            res.send("Passwords are not matching\n")
        }
    }
    catch (error) {

        res.status(400).send(error);
    }
    // newUser.save().then(function(){
    //     res.status(201).send(newUser);
    // }).catch(function(error){
    //     res.status(400).send(error);
    // });

});

router.get("/carreradvice", function (req, res) {
    res.render("carreradvice");
})

// RESTFUL API for data

// Users Login Data

app.get("/login", async function (req, res) {

    try {

        const usersData = await loginData.find()
        res.send(usersData);
    }
    catch (error) {
        res.send(error)
    }
})

// Get user's data by ID

app.get("/login/:id", async function (req, res) {
    try {
        // const _id = mongoose.Types.ObjectId(req.params.id);
        const objectId = ObjectId(_id);
        const studentData = await loginData.findById(objectId);
        if (!studentData) {
            return res.status(404).send(`error`);
        }
        else {

            res.send(studentData);
            console.log('done');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

//  Logout 



router.get("/logout", auth, async function(req,res){

    // User logout by deleting database token

    try{

        req.user.tokens = req.user.tokens.filter(function(currElement){
            return currElement.token !== req.token
        })

        // To logout user from every device, Call this function
        function allDevicesLogout(){

            req.user.tokens = [];
        }

        // User logout by deleting cookie 

        res.clearCookie("login");
        console.log("Logout successful");
        await req.user.save();

        //  Rendering Login Page
        res.render("loginPage")
    }
    catch(error){
        res.send(error);
    }
})

router.get("/reportproblem", function (req, res) {
    res.render("help/reportproblem");
})

// HELP Pages

router.get("/sitemap", function(req,res){
    console.log("Sitemap Requested")
    res.render("help/sitemap.hbs");
})


//  404 error page

app.get('*', function (req, res) {
    res.status(404).render("404error", {
        errorComment: "Not found"
    });
})


// Server Listen

app.listen(port, function () {
    console.log(`The server has started. Listening on port ${port}`);
})