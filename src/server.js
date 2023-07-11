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
const app = express(); // Instance of express.js

// Fetching country-state-city for Registration 

const country = require('country-state-city').Country;
const state = require('country-state-city').State;
const city = require('country-state-city').City;

// BCrypt Hashing Algorithm for Security

const bcrypt = require('bcryptjs');

// JWT Tokens for authentication and verifying users identity
const jwt = require('jsonwebtoken'); // Importing JWT Library

// Cookie Parser for JWT Token Authentication

const cookieParser = require("cookie-parser"); // For JWT Verification
app.use(cookieParser()); // Initializing CookieParser Middleware

// Proxy Agent for using proxies in Axios Web Scrapping 

// const ProxyAgent = require('axios-proxy-agent');


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

// HEADERS declared for Mimicing Real User while Web Scraping

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Cookie': 'cookie_name1=cookie_value1; cookie_name2=cookie_value2'
};

// User Verification Schema (For User's email verification)

const userVerification = require('./models/userVerification');

// Unique String for email verification

const { v4: uuidv4 } = require("uuid"); // Fetching UUID's sub model named 'Version 4'
const { response } = require('express');

// Nodemailer Controller Initialization

const sendMail = require("./controllers/sendMail");  // Importing Send Mail Controller

// Send Mail Route

app.get("/mail", sendMail);

// Nodemailer Transporter for User Email Verification

let transporter = nodemailer.createTransport({

    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
    }
})

// Testing NodeMailer Transporter

transporter.verify(function (error, success) {

    if (error) {

        // Error Messages

        console.log("\nHouston!! We Have a problem!!\n Sergie Arkhpov, Fetch me the error!!\n");
        console.log(`Roger Houston! \n ErrorCode : ${error.code}, \n ErrorResponse: ${error.response} \n Error Command ${error.command} \n`);
        console.log("Roger Sergie Arkhpov Over\n ");
    }

    else {

        // Nodemailer Test Message

        console.log("Nodemailer is Ready for Messages! ")
    }
})

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

router.get("/", async function (req, res) {

    // Scrapping Top MNC Companies

    const companiesSource = `https://content.techgig.com/technology/top-10-indian-it-companies-and-their-revenue-in-2022/articleshow/96445880.cms`;


    let companiesData = [];
    

    //  Sending request to scrap the companies data 

    async function scrapCompanies() {
        const response = await axios.get(companiesSource);

        const $ = cheerio.load(response.data);

        const baseCard = $(".col-md-8");
        baseCard.each(function () {
            title = $(this).find(".align-items-center mb-xsm").text();
            location = $(this).find('[data-test="employer-location"]').text()
            // listDate = $(this).find(".job-search-card__listdate").text()
            // company = $(this).find(".base-search-card__subtitle").text()

            // Pushing Scrapped Title and Location into an Array

            companiesData.push({title,location});

            // Consoling companiesData for testing
            console.log(companiesData);
        })

    }

    // try{

    //     const companiesData = await axios.get(companiesSource);  // GET Req using Axios
    //     const $ = cheerio.load(response.data); // Loading the response data into cheerio

    //     // Array of data

    //     // const companyTitles = 
    // }
    // catch{
    // }
    // scrapCompanies();

    res.status(200).render("index");
    app.set('title', 'CareerPilot : Home Page');
});

// Secret Pages ( Only for Authorized Users)

// DASHBOARD

router.get("/dashboard", auth, async function (req, res) {
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

    console.log(newsResponse.data.articles);

    res.status(200).render("dashboard", { userName, newsResponse });
})

router.get("/signup", function (req, res) {
    res.status(200).send("test");
});

router.get("/courses", function (req, res) {
    res.status(200).render("courses");
})

router.post("/courses", auth, async function (req, res) {

    // Fetching Course Details from the user
    const courseKeyword = req.body.courseKeyword;
    const courseLocation = req.body.courseLocation;

    // Arrays to store the fetched data

    const w3Courses = [];
    const microsoftCourses = [];
    let courseTitles = [];

    // Error Message incase course is not available

    let cError = "No such courses found";

    // URLs of the Course Sources

    const courseSources = {
        indeed: `https://www.indeed.com/certifications/s?q=${courseKeyword}&gv=&l=${courseLocation}&q_ct=cert&type=program&from=SearchPageSearchBar`,
        coursera: `https://www.coursera.org/search?query=${courseKeyword}&index=prod_all_launched_products_term_optimization`,
        w3schools: `https://campus.w3schools.com/search?type=article%2Cpage%2Cproduct&q=${courseKeyword}*+product_type%3ACourse`,
        microsoft: `https://learn.microsoft.com/en-us/certifications/browse/?terms=${courseKeyword}`
    }

    // Scrapping W3Schools Certifications

    async function scrapW3schools() {
        const response = await axios.get(courseSources.w3schools);
        const $ = cheerio.load(response.data);

        const w3Internships = $(".productgrid--item");
        w3Internships.each(function () {
            title = $(this).find('.productitem--title a').text().trim();
            price = $(this).find('span[class="money"]').text().trim();
            image = $(this).find('productitem--image-primary img').attr('src');
            w3Courses.push({ title, price, image });
            courseTitles.push(title);
            // console.log(w3Courses);
        })
    }

    await scrapW3schools();

    // Scrapping Microsoft Certifications

    async function microsoftScrapper() {

        try {

            const response = await axios.get(courseSources.microsoft);
            const $ = cheerio.load(response.data);

            const microsoftInternships = $(".card");
            microsoftInternships.each(function () {
                title = $(this).find(".card-title").text().trim();
                image = $(this).find(".card-template-icon a").attr('href');
                microsoftCourses.push({ title, image });
                console.log(microsoftCourses);
            });

        }
        catch (error) {

            console.log(error);
        }
    }

    await microsoftScrapper();

    res.status(200).render("courses", { w3Courses, microsoftCourses });
})

router.get("/internships", function (req, res) {
    console.log(req);
    res.status(200).render("internships");
});

router.post("/internships",auth, async function (req, res) {

    let internshipKeyword = req.body.internshipSearch;
    const jobLocation = req.body.location;
    console.log(internshipKeyword);

    // Array set of Internship Results

    const linkedinData = [];
    const internshalaData = [];
    let internshalaDataExp = [];

    // Predefined Internshala and Linkedin Objects for rendering

    let linkedinObj = [];
    let internshalaObj = [];

    //  Internship Titles

    let internshalaTitles = [];
    let internshalaLocation = [];
    let internshalaDuration = [];
    let internshalaCompany = [];

    let extras = [];

    // Error Message

    let errorMsg;


    // Internship Sources Object 

    const internshipSources = {

        linkedin: `https://www.linkedin.com/jobs/search?keywords=${internshipKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`,
        internshala: `https://internshala.com/internships/keywords-${internshipKeyword}/`,
        microsoft: `https://jobs.careers.microsoft.com/global/en/search?q=${internshipKeyword}&lc=in&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true`,

    }

    let linkedinSource = `https://www.linkedin.com/jobs/search?keywords=${internshipKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`;


    // Scrapping Linkedin

    async function scrapLinkedin() {

        try{

            const response = await axios.get(internshipSources.linkedin);
            const $ = cheerio.load(response.data);

            const linkedinInternships = $(".base-card");
            linkedinInternships.each(function () {
                title = $(this).find(".base-search-card__title").text();
                location = $(this).find('.job-search-card__location').text()
                listDate = $(this).find(".job-search-card__listdate").text()
                company = $(this).find(".base-search-card__subtitle").text()
    
                // link = $(this).find(".base-card__full-link").text()
                // linkedinData.push(` Title ${title}, Location : ${location}, List Date ${listDate},Posted By ${company}`);
    
                // Pushing LinkedinData in an Array
    
                linkedinData.push({ title, location, listDate, company });
            })
        }

        catch(error){
            errorMsg = error;
            console.log(error);
        }
    }

    // Internshala Scrapping

    async function scrapInternshala() {

        try{

            const response = await axios.get(internshipSources.internshala);
            const $ = cheerio.load(response.data);
            // console.log(internshipSources.internshala);
    
            const internshalaInternships = $(".individual_internship");
            await internshalaInternships.each(function () {
                title = $(this).find(".company_and_premium").text();
                location = $(this).find('.location_link').text();
                jobTitle = $(this).find('.company h3').text();
                companyLogo = $(this).find('.internship_logo img')
                // listDate = $(this).find(".job-search-card__listdate").text()
                // link = $(this).find(".base-card__full-link").text()
                internshalaData.push({ title, location, jobTitle });
                internshalaTitles.push(title);
                internshalaLocation.push(location);
                console.log(internshalaData);
    
            });
        }

        catch(error){

            errorMsg = error;
            console.log(error);
            // res.render("internships",{errorMsg})
            
        }

        // res.send(internshalaData);
    }

    await scrapInternshala();

    // Scrap Microsoft Carrers Website for Internship Lists

    async function scrapMicrosoft() {

        const response = await axios.get(internshipSources.microsoft);
        const $ = cheerio.load(response.data);

        const microsoftInternships = $('.phs-jobs-list');
        await microsoftInternships.each(function () {
            title = $(this).find().text();
        })
    }

    await scrapLinkedin();

    // console.log(internshalaData);
    // console.log(jobLocation);
    // console.log(internshipSources.linkedin)

    res.status(200).render("internships", { linkedinData, internshalaData, errorMsg });

})

// New UI Pages. Will be replaced later on

// Registration Page 2

router.get("/reg2", async function(req,res){
    res.status(200).render("reg2");
});

// Job Page 2

router.get("/jobs2", async function(req,res){
    console.log(req);
    res.render("/jobs2");
});

// Login Page 2

router.get("/login2", async function(req,res){
    res.status(200).render("login2");
})

router.get("/test", async function (req, res) {

    res.status(200).render("test");

})

router.get("/grants", function (req, res) {
    console.log(req);
    res.status(200).render("grants");
});

// Current Jobs Page

router.get("/jobs", function (req, res) {
    console.log(req);
    res.status(200).render("jobs");
});

router.post("/jobs", auth, async function (req, res) {

    // Form data taken from User

    const jobKeyword = req.body.jobKeyword;
    const jobLocation = req.body.jobLocation;
    console.log(jobKeyword);

    // Storing Axios Response

    const naukriDotComJobs = []  // Storing NaukriDotCom Data
    const zrJobsData = [];  // Storing ZipRecruiter Data
    const linkedinData = []; // Storing Linkedin Data
    const microsoftData = []; // Scrapping Microsoft
    const jobRapidoData = []; // Scrapping Job Rapido



    // Job Scraping Sources

    const jobSources = {
        zipRecruiter: `https://www.ziprecruiter.in/jobs/search?q=${jobKeyword}&l=Vadodara%2C+India&lat=22.3&long=73.2&d=`,
        naukriDotCom: `https://www.naukri.com/web-development-jobs?k=${jobKeyword}`,
        microsoft: `https://jobs.careers.microsoft.com/global/en/search?q=${jobKeyword}&lc=India&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true`,
        linkedin: `https://www.linkedin.com/jobs/search?keywords=${jobKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`,
        jobRapido: `https://in.jobrapido.com/?w=${jobKeyword}&l=india&r=auto&shm=all`
    }

    // Scrapping LinkedIn

    async function scrapLinkedin() {
        const response = await axios.get(jobSources.linkedin, { headers });

        const $ = cheerio.load(response.data);

        const linkedinInternships = $(".base-card");
        linkedinInternships.each(function () {
            title = $(this).find(".base-search-card__title").text();
            location = $(this).find('.job-search-card__location').text().trim()
            listDate = $(this).find(".job-search-card__listdate").text().trim()
            company = $(this).find(".base-search-card__subtitle").text().trim();
            image = $(this).find("")

            // link = $(this).find(".base-card__full-link").text()
            // linkedinData.push(` Title ${title}, Location : ${location}, List Date ${listDate},Posted By ${company}`);

            linkedinData.push({ title, location, listDate, company });
            // console.log(linkedinData)

        })
    }

    await scrapLinkedin()

    // Scrapping NaukriDotCom

    async function naukriDotCom() {
        const response = await axios.get(jobSources.naukriDotCom, { headers });
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        console.log("check1");
        const naukriJobs = $(".jobTupleHeader");
        naukriJobs.each(function () {
            title = $(this).find('.title').text().trim();
            console.log("check2");
            company = $(this).find('.companyInfo a').text().trim();
            console.log("check3");

            naukriDotComJobs.push({ title, company });
            console.log("check4");
            // console.log(naukriDotComJobs);
        })
    }

    await naukriDotCom();

    // Scrapping ZipRecruiter

    async function scrapZR() {

        // Sending Axios request

        try {

            const response = await axios.get(jobSources.zipRecruiter, { headers });
            // console.log(response.data);
            const $ = cheerio.load(response.data);
            console.log("check1");
            const zrJobs = $(".jobList");
            zrJobs.each(function () {
                title = $(this).find('.jobList-title strong').text().trim();
                console.log("check2");
                company = $(this).find('.jobList-introMeta li').text().trim();
                console.log("check3");

                zrJobsData.push({ title, company });
                console.log(zrJobsData);
                // console.log(zrJobsData);
            })
        }

        catch (error) {
            console.log(error);
        }

    }

    await scrapZR();

    async function scrapMicrosoft() {

        const response = await axios.get(jobSources.microsoft, { headers });

        const $ = cheerio.load(response.data);
        console.log("check1");
        const naukriJobs = $(".jobTupleHeader");
        naukriJobs.each(function () {
            title = $(this).find('.title').text().trim();
            console.log("check2");
            company = $(this).find('.companyInfo a').text().trim();
            console.log("check3");

            naukriDotComJobs.push({ title, company });
            console.log("check4");
            // console.log(naukriDotComJobs);
        })
    }

    // JobRapido Scrapper

    async function scrapJobRapido() {

        const response = await axios.get(jobSources.jobRapido, { headers });
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        console.log("check1");
        const jrJobs = $(".result-item");
        jrJobs.each(function () {
            title = $(this).find('.result-item__title').text().trim();
            company = $(this).find('.result-item__company').text().trim();

            jobRapidoData.push({ title, company });

            // console.log(jobRapidoData);
        });
    }
    
    
    await scrapJobRapido()
    res.status(200).render("jobs", { linkedinData, jobRapidoData, naukriDotComJobs });
});

router.get("/hackathons", function (req, res) {
    console.log(req);
    res.status(200).render("hackathons");
});

app.get("/feedbackPage", function (req, res) {
    res.status(200).render("help/feedback");
});

app.get("/about", function (req, res) {
    res.status(200).render("about.hbs");
})

app.post("/feedback", function (req, res) {
    const feedback = new feedbackData(req.body);
    feedback.save().then(function () {
        const feedbackResponse = `Thank you for your valuable feedback!! `;
        res.status(201).render("help/feedback");
    }).catch(function (error) {
        res.status(400).send(error);
    })
});


router.get("/scholarships", async function (req, res) {
    console.log(req);
    res.status(200).render("scholarships");
});

router.post("/scholarships", async function (req, res) {

    const scholarshipLocation = req.body.locationForScholarship;
    const scholarshipQualification = req.body.educationForScholarship;
    const scholarshipKeyword = req.body.scholarshipKeyword;


    // Scholarship Sources

    const scholarshipSources = {

        scholarshipForme: `https://scholarshipforme.com/scholarships?state=${scholarshipLocation}&qualification=${scholarshipQualification}&category=&origin=&type=&availability=&form_botcheck=`,
        buddyForStudy: `https://www.scholarshipportal.com/bachelor/scholarships/india`,
        nationalScholarship: `https://scholarships.gov.in/`,
        scholarshipsAu: `https://scholarships.uq.edu.au/scholarships?text=${scholarshipKeyword}`

        // microsoft: `https://careers.microsoft.com/students/us/en/search-results?keywords=${internshipKeyword}`,

    };

    // To store ScholarshipForme Data
    let sFormeData = [];
    let sPortalData = [];
    let nationalScholarshipData = [];

    async function scrapScholarshipForme() {

        const response = await axios.get(scholarshipSources.scholarshipForme);
        const $ = cheerio.load(response.data);
        const scholarshipContainers = $(".resume-item");
        
        scholarshipContainers.each(function () {

            title = $(this).find(".right h3").text().trim();
            location = $(this).find('.skills').children().first().text().trim();
            validity = $(this).find('small').text().trim();
            description = $(this).find(".right p").children().eq(3).text().trim();
            // company = $(this).find(".base-search-card__subtitle").text()
            sFormeData.push({title,location,description,validity});
        })

        // console.log(sFormeData);
        console.log(scholarshipSources.scholarshipForme);
        res.status(200).render("scholarships", { sFormeData });

    }
    
        scrapScholarshipForme();

    
    // 

    async function scrapOtherScholarships() {

        try {

            const studyPortalsResponse = await axios.get(scholarshipSources.studyPortals);
            const $ = cheerio.load(studyPortalsResponse.data);
            const studyPortalContainer = $(flex.flex - col);

            studyPortalContainer.each(function () {

                title = $(this).find(".right h3").text();
                // location = $(this).find('.job-search-card__location').text()
                // listDate = $(this).find(".job-search-card__listdate").text()
                // company = $(this).find(".base-search-card__subtitle").text()
                sPortalData.push(title);
                console.log(sPortalData);
            })
        }

        catch (error) {
            console.log(error);
        }
    }

    // scrapOtherScholarships();
    
    async function scrapBuddyForStudy() {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(scholarshipSources.buddyForStudy);
        page.$$eval('.scholarshipslistcard_listCard__3oVnA', function cards() {
            console.log(cards);
            return cards;
        })

        cards();
    }
    
    async function scrapNSP() {    //Scrapping National Scholarship Portal

        const studyPortalResponse = axios.get(scholarshipSources.nationalScholarship);
        const $ = cheerio.load(studyPortalResponse.data)
        const nspContainer = 'test';
    }

    async function scholarshipsAU() {

        const scholarshipsAuResponse = axios.get(scholarshipSources.scholarshipsAu);
        const $ = cheerio.load(scholarshipsAuResponse.data);
    }


    console.log(sFormeData);
    
});


app.get("/faq", function (req, res) {
    console.log(req);
    res.status(200).render("help/faq");
});

app.get("/contactus", function (req, res) {
    console.log(req);
    res.status(200).render("contactus");
});

app.post("/contactus", async function (req, res) {

    // Sending email through nodemailer

    const testAccount = await nodemailer.createTestAccount();

    // Connection with SMTP Server

    let transporter = nodemailer.createTransport({

        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'roslyn.mertz@ethereal.email',
            pass: 'eHY3rpZp1Jx6tKzYm7',
        },
    });

    let info = await transporter.sendMail({
        from: `${req.body.email}`,
        to: "prakashbhatia1970@gmail.com",
        text: `${req.body.message}`,
        // html: `` Just in case 
    })

    console.group(req.body.username);

    const emailResults = ` Email from : ${info.envelope.from}, \n Email to ${info.envelope.to}`
    res.render("utility/emailsent", { emailResults });

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

        const errorMsg = "Invalid Login Details!";

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
            res.status(201).render("loginPage", {errorMsg});
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

router.get('/accountcreation', async function(req,res){
res.status(201).render("accountcreation");
})

router.get('/registration', function (req, res) {
    res.status(200).render("registration");
});

router.post('/registration', async function (req, res) {

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
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
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
                // verified: false  // Added recently for UV
            });

            console.log(registerUser);

            // JWT Token middleware

            const token = await registerUser.generateAuthToken();
            console.log("The token part is " + token);

            // Set Cookie based on jwt token

            res.cookie("jwt_registration", token, {

                expires: new Date(Date.now() + 15 * 60 * 1000),  //  Test Cookie expires in 15 minutes
                httpOnly: true
                // secure: true
            });

            // Password Hash Middleware

            const registered = await registerUser.save();

            // if(registered){
            //     res.status(201).render("index");
            // }

            const userName = await req.user.fullName.toUpperCase();
            res.status(201).render("accountcreation",{userName});
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

router.get("/logout", auth, async function (req, res) {

    // User logout by deleting database token

    try {

        req.user.tokens = req.user.tokens.filter(function (currElement) {
            return currElement.token !== req.token
        })

        // To logout user from every device, Call this function
        function allDevicesLogout() {

            req.user.tokens = [];
        }

        // User logout by deleting cookie  

        res.clearCookie("login");
        console.log("Logout successful");
        await req.user.save();

        //  Rendering Login Page
        res.render("loginPage")
    }
    catch (error) {
        res.send(error);
    }
})

router.get("/logoutAll", auth, async function(req,res){
 
    try {

        
            // To logout user from every device, Call this function
            function allDevicesLogout() {
                req.user.tokens = [];
            }
            allDevicesLogout()

            const logoutMessage = ` You have been Logged Out from all devices`;
            //  Rendering Login Page
            res.render("loginPage",{logoutMessage});

    }
    catch (error) {
        res.send(error);
    }

});

router.get("/reportproblem", function (req, res) {
    res.render("help/reportproblem");
});

router.get("/forgotpassword", async function(req,res){
    console.log(req);
    res.render("forgotPassword");
});

router.post("/forgotpassword", async function(req,res){
    console.log(req);

    // Getting Email Address from the user 

    const userEmail = req.body.email;

    // Verifying Email Address

    try{

        const emailIsMatch = await registrationData.findOne({ userEmail });

        const userFound = "User has been found\n";
        if(emailIsMatch){

            res.status(200).send(userFound);
        }

    }

    catch(error){
        res.send(error);
    }


})

// HELP Pages

router.get("/sitemap", function (req, res) {
    console.log("Sitemap Requested");
    res.render("help/sitemap.hbs");
});

// User Profile

router.get("/myprofile", auth, async function (req, res) {
    console.log(req);

    const userProfile = {
        username : req.user.fullName,
        userCity : req.user.city,
        userState : req.user.state,
        userGender : req.user.gender,
        userStatus : req.user.currentStatus,
        userInterests : req.user.interests
    }
    const userName = req.user.fullName.toUpperCase();
    res.status(200).render("userProfile.hbs", { userProfile });

});

router.get("/success", async function(req,res){
    const userName = await req.user.fullName.toUpperCase();
    res.status(200).render("accountcreation", {userName})
})


//  Error Handling Middleware

app.use(function(err,req,res,next){

    // Default 500 Internal Server Error

    let statusCode = 500;

    // Check if error has a specific status code

    if(err.statusCode){
        statusCode = err.statusCode;
    }

    // Rendering a custom error page based on the status code

    // res.status(statusCode);

    // res.render("customError",{statusCode})
    let errorTitle;
    let errorDesc;

    switch (statusCode){

        case 403:
             errorTitle = "Forbidden";
             errorDesc="There is no way you can access the requested data. A 403 error announces that the data is off limits."
             res.status(statusCode).render("customError.hbs", {statusCode, errorTitle, errorDesc});

            break;

        case 417:
            errorTitle = "Expectations Failed";
            errorDesc = "Expectation given in the request's Expect header could not be met."
            res.status(statusCode).render("customError.hbs", {statusCode, errorTitle, errorDesc});


        case 503:
            errorTitle = "Service Unavailable";
            errorDesc = "Server is temporarily unable to handle the request";
            res.status(statusCode).render("customError.hbs", {statusCode, errorTitle, errorDesc});

        case 505:
            errorTitle = "HTTP Version not supported";
            errorDesc = "The server can't communicate with the client ";
            res.status(statusCode).render("customError.hbs", {statusCode, errorTitle, errorDesc});

        default:
             errorTitle = "Internal Server Error";
             errorDesc = "The server encountered an error trying to process the request";
             res.status(statusCode).render("customError.hbs", {statusCode, errorTitle, errorDesc});
            break;

    }
});

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