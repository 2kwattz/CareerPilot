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
const compression = require('compression')

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

// Google Oauth for Nodemailer

const { google } = require('googleapis');

// Multer for storing Profile Picture (User's DP)

const multer = require('multer');

// Multer configuration
const storage = multer.memoryStorage(); // Store files in memory (you can configure this as per your needs)
const upload = multer({ storage: storage });

// Multer Middleware

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));




// MailGun for Nodemailer

const mailgun = require('mailgun-js')({
    apiKey: 'pubkey-a4227a65e466841ab540c1b02d362f6d',
    domain: 'sandboxb60c058465804065bb1c4c58d505e807.mailgun.org',
});

// DB Client Connect

// const db = client.db('careerpilot'); // For Updating Collections 

// Compression Middleware for speed optimization

app.use(compression())

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

// ScrappingAnt for Restricted websites

const ScrapingAntClient = require('@scrapingant/scrapingant-client');
const client = new ScrapingAntClient({ apiKey: '<YOUR-SCRAPINGANT-API-KEY>' });

// Initializing Middlewares

app.use(express.static(staticPath)); // Defining path for static HTML,CSS and Javascript files
hbs.registerPartials(partialsPath);
app.use(bodyParser.urlencoded({ extended: false })); //Middlewares for parsing the request body
app.use(bodyParser.json());
// app.use(auth)

// User Login Verification Middleware (Not Working so Commented)

app.use((req, res, next) => {

    const token = req.cookies.login;
    if (token) {
        try {
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY); // Authenticating user's token with the one stored 
            console.log(verifyUser);
            res.locals.verifyUser = verifyUser;
        } catch (error) {
            console.log("Token verification failed:", error);
        }
    }
    next(); // Move this line after the verification logic
    console.log("Middleware executed");
});


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

// Forgot password reset auth


// OAuth2 credentials (create these from Google Developer Console)
// const credentials = {
//     client_id: 'YOUR_CLIENT_ID',
//     client_secret: 'YOUR_CLIENT_SECRET',
//     redirect_uri: 'YOUR_REDIRECT_URI',
//   };

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

            companiesData.push({ title, location });

            // Consoling companiesData for testing
            console.log(companiesData);
        })

    }

    res.status(200).render("index");
    // app.set('title', 'CareerPilot : Home Page');
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

// router.get("/certifications", function(req,res){
//     res.status(200).render("certifications")
// })

router.get("/courses", function (req, res) {
    res.status(200).render("certifications2");
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

            // Refining Scrapped Data

            // Removing special characters and commas from price text and typecasting it to number

            price = parseInt(price.replace(/[$,]/g, '').trim());

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
            console.log(response.data)

            const microsoftInternships = $(".card-template");
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

    res.status(200).render("certifications2", { w3Courses });
})

router.get("/internships", function (req, res) {
    console.log(req);
    res.status(200).render("internships2");
});

router.post("/internships", auth, async function (req, res) {

    let internshipKeyword = req.body.internshipKeyword;
    const jobLocation = req.body.location;
    console.log(internshipKeyword);

    // Array set of Internship Results

    const linkedinData = [];
    const internshalaData = [];
    let internshalaDataExp = [];
    let wwrAbout = [];

    // Predefined Internshala and Linkedin Objects for rendering

    let linkedinObj = [];
    let internshalaObj = [];
    let extras = [];

    // Error Message

    let errorMsg;

    // Internship Sources Object 

    const internshipSources = {

        linkedin: `https://www.linkedin.com/jobs/search?keywords=${internshipKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`,
        internshala: `https://internshala.com/internships/keywords-${internshipKeyword}/`,
        microsoft: `https://jobs.careers.microsoft.com/global/en/search?q=${internshipKeyword}&lc=in&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true`,

    }

    // Scrapping Linkedin

    async function scrapLinkedin() {

        try {

            const response = await axios.get(internshipSources.linkedin);
            const $ = cheerio.load(response.data);

            const linkedinInternships = $(".base-card");
            linkedinInternships.each(function () {
                title = $(this).find(".base-search-card__title").text();
                location = $(this).find('.job-search-card__location').text()
                listDate = $(this).find(".job-search-card__listdate").text()
                company = $(this).find(".base-search-card__subtitle").text()

                // Pushing LinkedinData in an Array

                linkedinData.push({ title, location, listDate, company });
             
            })
        }

        catch (error) {
            errorMsg = error;
            console.log(error);
        }
    }

    // Internshala Scrapping

    async function scrapInternshala() {

        try {

            const response = await axios.get(internshipSources.internshala);
            const $ = cheerio.load(response.data);
            // console.log(internshipSources.internshala);

            const internshalaInternships = $(".individual_internship");
            internshalaInternships.each(function () {
                title = $(this).find(".company_and_premium").text();
                location = $(this).find('.location_link').text();
                jobTitle = $(this).find('.company h3').text();
                // duration = $(this).find('.internship_other_details_container .other_detail_item').text();
                stripend = $(this).find('.stipend_container .item_body span').text();
                viewDetailsLink = $(this).find('.cta_container a').attr('href');
                companyLogo = $(this).find('.internship_logo img').attr('src');
                postStatus = $(this).find('.status-container .ic-16-reschedule').text()
                // listDate = $(this).find(".job-search-card__listdate").text()
                // link = $(this).find(".base-card__full-link").text()

                // Refining Processed Data

                // Removing Special Characters, Commas etc for easier filtering purpose
                
                // stripend = parseInt(stripend.replace(/[₹,]/g, '').trim());

                if (stripend && stripend.trim() !== "") {
                    // Remove special characters and convert to integer
                    stripend = parseInt(stripend.replace(/[₹,]/g, '').trim());
                }

                // View Internship Details

                const redirectLink = `https://www.internshala.com${viewDetailsLink}`;
                // Getting Company's Logo

                const imgSources = `https://www.internshala.com/${companyLogo}`;
                // console.log(imgSources)

                // Company Logo Rendering

                // axios.get(imgSources, { responseType: 'arraybuffer' })
                //     .then(response => {
                //         const imageBuffer = Buffer.from(response.data, 'binary');

                //         //Converting Image to BASE64 String as Binary image cannot be directly stored in an Array
                //         const base64Image = imageBuffer.toString('base64');
                //         const dataURI = `data:image/jpeg;base64,${base64Image}`;
                //         internshalaData.push(dataURI);

                //     })
                //     .catch(error => {
                //         console.error('Failed to fetch image:', error);
                //     });

                // Scrap Innerdetails

                
                
            //     try {
            //     async function scrapDetails() {
            //         const response = await axios.get(redirectLink, { headers });
            //         const $ = cheerio.load(response.data);
            //         console.log("Inner function reached\n")
            //         const aboutJob = $('#AboutDesktop').text();
            //         console.log(aboutJob);
            //         wwrAbout.push(aboutJob);
            //     }
                
            //     scrapDetails();
            // } catch (innerError) {
            //     console.log(innerError)
            // }

                internshalaData.push({ title, location, jobTitle, redirectLink, stripend});

                // console.log(internshalaData);

                // console.log(wwrAbout)
            });
        }

        catch (error) {

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

    res.status(200).render("internships2", { linkedinData, internshalaData });

})

// Internship Redirects

router.get("intredirect", auth, async function (req, res) {
    console.log(req);
})

// New UI Pages. Will be replaced later on

// Registration Page 2

router.get("/reg2", async function (req, res) {
    res.status(200).render("reg2");
});

// Job Page 2

// router.get("/jobs", async function (req, res) {
//     console.log(req);
//     res.render("jobs");
// });

// Login Page 2

router.get("/login2", async function (req, res) {
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
    const bjoData = []; // Scrapping BestJobsOnline Portal
    const wwr = [];
    const wwrAbout = [];

    // Error Responses

    let errorRender;

    // Job Scraping Sources

    const jobSources = {
        zipRecruiter: `https://www.ziprecruiter.in/jobs/search?q=${jobKeyword}&l=Vadodara%2C+India&lat=22.3&long=73.2&d=`,
        naukriDotCom: `https://www.naukri.com/web-development-jobs?k=${jobKeyword}`,
        microsoft: `https://jobs.careers.microsoft.com/global/en/search?q=${jobKeyword}&lc=India&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true`,
        linkedin: `https://www.linkedin.com/jobs/search?keywords=${jobKeyword}&location=${jobLocation}&geoId=102713980&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`,
        jobRapido: `https://in.jobrapido.com/?w=${jobKeyword}&l=india&r=auto&shm=all`,
        bestJobsOnline: `https://in.best-jobs-online.com/serp/1/?position=${jobKeyword}&location=${jobLocation}`,
        wwr: `https://weworkremotely.com/remote-jobs/search?search_uuid=&term=${jobKeyword}&button=&sort=any_time`
    }

    // Scrapping LinkedIn

    async function scrapLinkedin() {
        const response = await axios.get(jobSources.linkedin, { headers });

        const $ = cheerio.load(response.data);

        const linkedinInternships = $(".base-card");

        // Scrapping Outer Job Details

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

    // async function naukriDotCom() {
    //     const response = await axios.get(jobSources.naukriDotCom, { headers });
    //     // console.log(response.data);
    //     const $ = cheerio.load(response.data);
    //     console.log("check1");
    //     const naukriJobs = $(".jobTupleHeader");
    //     naukriJobs.each(function () {
    //         title = $(this).find('.title').text().trim();
    //         console.log("check2");
    //         company = $(this).find('.companyInfo a').text().trim();
    //         console.log("check3");

    //         naukriDotComJobs.push({ title, company });
    //         console.log("check4");
    //         // console.log(naukriDotComJobs);
    //     })
    // }

    // await naukriDotCom();

    // Scrapping ZipRecruiter

    async function scrapZR() {

        // Sending Axios request

        try {

            const response = await axios.get(jobSources.zipRecruiter, { headers });
            // console.log(response.data);
            const $ = cheerio.load(response.data);

            console.log("check1");

            if (response.statusCode = 200) {

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

            else {

                //  Error in rednering scrapped jobs data 

                global.errorRender = {
                    statusCode: response.status,
                    statusText: response.statusText,
                    errorCode: response.code,
                    respStatusCode: response.request.response.status,
                    resStatus: response.res.statusCode,
                    resMessage: response.res.statusMessage

                }

            }
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

        // Scrapping Outer Job Details 
        jrJobs.each(function () {
            title = $(this).find('.result-item__title').text().trim();
            company = $(this).find('.result-item__company').text().trim();
            location = $(this).find('.result-item__location-label').text().trim();

            jobRapidoData.push({ title, company, location });

            // console.log(jobRapidoData);
        });
    }


    await scrapJobRapido()

    // Scrapping BestJobsOnline Portal

    // async function scrapBJO() {

    //     const response = await axios.get(jobSources.bestJobsOnline, { headers });
    //     console.log(response.data);
    //     const $ = cheerio.load(response.data);
    //     console.log("check1");
    //     const bjoJobs = $(".my-8");
    //     bjoJobs.each(function () {
    //         title = $(this).find('.sm:flex sm:shrink sm:grow-0 sm:flex-col h3').text().trim();
    //         // company = $(this).find('.result-item__company').text().trim();

    //         bjoData.push({ title });

    //         console.log(bjoJobs);
    //     });
    // }


    // await scrapBJO()

    async function scrapWwr() {
        const response = await axios.get(jobSources.wwr, { headers });
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        console.log("check jn");
        const wwrJobs = $(".feature");

        // Scrapping Outer Job Details
        wwrJobs.each(function () {
            title = $(this).find('.title').text().trim();
            company = $(this).find('.company').text().trim();
            featured = $(this).find('.featured').text().trim();
            link = $(this).find('.feature a').attr('href').trim();
            // location = $(this).find('.result-item__location-label').text().trim();

            const redirectLink = `https://weworkremotely.com${link}`;
            console.log(redirectLink);

            // Scrapping Inner Details of Individual Job Posting such as description 

            try{
                
                async function scrapDetails() {
                     const response = await axios.get(redirectLink, { headers });
                     const $ = cheerio.load(response.data);
                     console.log("Inner function reached\n")
                     global.aboutJob = $('#AboutDesktop').text();
                     console.log(global.aboutJob);
                     wwr.push(global.aboutJob);
                 }
                 scrapDetails();
            } catch(error){
                console.log(error);
            }
            
            
            wwr.push({ title, company, featured, link, redirectLink});
            console.log(wwr);
        })
    }

    await scrapWwr()

    res.status(200).render("jobs", { linkedinData, wwr, wwrAbout, jobRapidoData, errorRender });
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
            sFormeData.push({ title, location, description, validity });
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
            res.status(201).render("loginPage", { errorMsg });
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

router.get('/accountcreation', async function (req, res) {
    res.status(201).render("accountcreation");
})

router.get('/registration', function (req, res) {
    res.status(200).render("reg2");
});

router.post('/registration', upload.single('updateImage'), async function (req, res) {

    // Create a new user in our database



    const profilePicture = req.file.buffer.toString('base64');



    // Converting the Image to Buffer
    // const bufferData = uploadedFile.buffer;

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
                currentStatus: req.body.currentStatus,
                secQuestion: req.body.secQuestion,
                secQuestionAnswer: req.body.secQuestionAnswer,
                collegeCourse: req.body.collegeCourse,
                collegeName: req.body.collegeName,
                collegeBranch: req.body.collegeBranch,
                profileImage: profilePicture
                // verified: false  // Added recently for UV
            });

            console.log(registerUser);

            // JWT Token middleware

            const token = await registerUser.generateAuthToken();
            // console.log("The token part is " + token);

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

            const userName = req.user.fullName.toUpperCase();
            res.status(201).redirect(`/accountcreation?userName=${userName}`);

            // res.status(201).redirect("accountcreation", { userName });
        }

        else {
            res.send("Passwords are not matching\n")
        }

    }
    catch (error) {

        res.status(400).send(error);
        console.log(error)
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

router.get("/logoutAll", auth, async function (req, res) {

    try {


        // To logout user from every device, Call this function
        function allDevicesLogout() {
            req.user.tokens = [];
        }
        allDevicesLogout()

        const logoutMessage = ` You have been Logged Out from all devices`;
        //  Rendering Login Page
        res.render("loginPage", { logoutMessage });

    }
    catch (error) {
        res.send(error);
    }

});

router.get("/reportproblem", function (req, res) {
    res.render("help/reportproblem");
});

router.get("/forgotpassword", async function (req, res) {
    console.log(req);

    // const securityQuestion = await req.user.secQuestion;

    // Test for secQuestion in db
    // console.log(securityQuestion);

    res.render("forgotPassword");
});

router.get("/resetpassword", auth, async function (req, res) {

    res.render("resetpassword")
})

router.post("/resetpassword", auth, async function (req, res) {
    // Individual Userid for each account
    const userId = req.user._id;

    // Fetching new password from the user in Reset Password Form
    const newPassword = req.body.updatedPassword;

    // Number of salt rounds for Password Hashing
    const salts = 10;

    // Hashing the password using bycrypt encryption

    const hashedPassword = await bcrypt.hash(newPassword, salts);

    // Updating user's password in the database

    const updateResult = await registrationData.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword } }
    );

    // Redirects according to the results 

    try {

        if (updateResult.nModified > 0) {
            console.log('Password reset successful');
            res.redirect('/loginPage'); // Redirect to the login page or any other appropriate page
        }
        else {
            const message = "Password has been changed successfully!!";
            console.log('User not found');
            // res.status(404).send('User not found');
            res.render("loginPage", { message });
        }
    }

    catch (err) {
        console.error(err);
        res.status(500).send('Error resetting password'); // Handle the error gracefully
    }

})

router.post("/forgotpassword", async function (req, res) {
    console.log(req);

    //Getting Email Address from the user 

    const userEmail = req.body.email.trim();

    //Verifying Email Address

    try {
        const { email } = req.body;
        const user = await registrationData.findOne({ email });
        let responseMessage;

        if (!user) {
            // User not found, display error message
            responseMessage = " User Not Found ";
            return res.render("forgotpassword", { responseMessage });
        }

        // Generate password reset token and send reset email
        await user.generatePasswordReset();

        // Display success message or redirect to a page
        responseMessage = "Password Reset link has been sent!"
        res.render("forgotpassword", { responseMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }


});

router.get("/securityQuestion", auth, async function (req, res) {

    const securityQuestion = await req.user.secQuestion;

    // Test for secQuestion in db
    console.log(securityQuestion);

    res.render("securityQuestion", { securityQuestion });
});


router.post("/securityQuestion", auth, async function (req, res) {

    const securityAnswer = await req.user.secQuestionAnswer;
    const userResponse = await req.body.secAnswer;
    console.log(userResponse);

    if (userResponse !== securityAnswer) {
        const message = "The answer to the security question does not match \n";
        res.render("securityQuestion", { message });
    }

    else {
        const message = "The answer to the question is correct. Very good. Please go and click reset password button now"
        res.render("resetpassword");
    }

})

// Forgot Password Redirects

router.post("/resetpassword/:token", async function (req, res) {
    try {
        const token = req.params.token;
        const user = await registrationData.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).send("Invalid or expired token");
        }

        // password reset form here
        res.render("resetpassword", { token });
    } catch (error) {
        res.status(500).send("An error occurred while processing the reset token.");
    }
});

//   Update Email Address Routes

router.get("/updateEmail", auth, async function (req, res) {
    console.log(req);

    const currentEmail = req.user.email;
    res.render("updateEmail", { currentEmail })

})

// HELP Pages

router.get("/sitemap", function (req, res) {
    console.log("Sitemap Requested");
    res.render("help/sitemap.hbs");
});

// User Profile

// Profile Picture Updation

router.get("/upload", auth, async function (req, res) {
    res.send("Only POST Requests are allowed. Sorry\n")
})

app.post('/upload', auth, upload.single('updateImage'), async (req, res) => {
    // Access the uploaded file using req.file
    const uploadedFile = req.file;


    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }

    try {

        // Converting the Image to Buffer
        const bufferData = req.file.buffer.toString('base64');

        await registrationData.updateOne(
            { _id: req.user._id },
            { $set: { profileImage: bufferData } })

        console.log(bufferData)

        res.send('File uploaded successfully!');
    } catch (error) {
        console.error(error);
        console.log(req.file.buffer)
        res.status(500).send(error);
    }
});

router.get("/myprofile", auth, async function (req, res) {
    console.log(req);

    const userProfile = {
        username: req.user.fullName,
        userCity: req.user.city,
        userState: req.user.state,
        userGender: req.user.gender,
        userStatus: req.user.currentStatus,
        userInterests: req.user.interests,
        userClg: req.user.collegeName,
        userAge: req.user.age,
        userBranch: req.user.collegeBranch,
        userCourse: req.user.collegeCourse,
        userAvatar: req.user.profileImage
    }

    const capName = userProfile.username.slice(0, 1).toUpperCase() + userProfile.username.slice(1, userProfile.username.length).toLowerCase();
    console.log(userProfile.userAvatar);
    // Scrap City Information for User Profile

    // Temp Display based on user's city


    async function cityTemp() {

        // Converting User's city to Lat Lon 

        let lat;
        let lon;
        const latLongApi = `https://api.api-ninjas.com/v1/geocoding?city=${req.user.city}&country=${req.user.country}`

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
        const apikey = env.TEMP_API_KEY;

        const userCity = req.user.city;
        const response = axios.get(apiUrl);

    }

    // Profile Picture Buffer

    const profileImageData = await req.user.profileImage;
    // const base64Image = profileImageData.toString('base64');

    res.status(200).render("userProfile.hbs", { userProfile, capName, profileImageData });

});

router.post("/myprofile", auth, upload.single('updateImage'), async function (req, res) {
    //    const addProfilePicture =  new registrationData({
    //         profileImage: req.body.profileImage,
    // })

    const uploadedFile = req.file;


    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }

    try {

        // Converting the Image to Buffer
        // const bufferData = Buffer.from(req.file.buffer);
        const bufferData = req.file.buffer.toString('base64');

        await registrationData.updateOne(
            // { profileImage: bufferData },
            { _id: req.user._id },
            { $set: { profileImage: bufferData } })

        console.log(bufferData)

        res.send('File uploaded successfully!');
    } catch (error) {
        console.error(error);
        console.log(req.file.buffer)
        res.status(500).send(error);
    }


    // await registrationData.updateOne(
    //     { profileImage: updatedImage },
    //     { $set: { profileImage: updatedImage } })

    // const registrationData = new RegistrationData({
    //     // Set other fields in your schema here
    //     // ...
    // });

    // await registrationData.save(); 

    // await addProfilePicture.save();
    res.render("myprofile", { uploadedFile });
});


router.get("/success", async function (req, res) {
    const userName = await req.user.fullName.toUpperCase();
    res.status(200).render("accountcreation", { userName })
})

router.get("/settings", auth, async function (req, res) {

    res.status(200).render("settings");
})

router.get("/setting", auth, async function (req, res) {
    res.status(200).render("settings2");
})

// Updating Account Settings 

// Updating Name

router.get("/namechange", auth, async function (req, res) {

    const currentName = req.user.fullName;

    res.status(200).render("namechange", { currentName });
});

router.post("/namechange", auth, async function (req, res) {

    const currentName = req.user.fullName;
    const updatedName = req.body.updatedName;

    // Update the user's name in the database
    await registrationData.updateOne(
        { fullName: currentName },
        { $set: { fullName: updatedName } }
        // (err, result) => {
        //     if (err) return console.log(err);
        //     console.log('Name updated successfully');
        //     res.redirect('/myprofile'); // Redirect to the user's profile page
        // }
    );
    const message = "Name Changed successfully\n";
    console.log('Name updated successfully');
    res.render("namechange", { message }); // Redirect to the user's profile page

    // else {
    //     console.log('No matching user found to update');
    //     res.status(404).send('User not found');
    // }
})



router.post('/updateName', auth, async function (req, res) {
    const fullName = req.user.fullName;
    const newName = req.body.newName;

})

// New index 

router.get("/index2", async function (req, res) {

    res.render("index2");
});

// Privacy Policy

app.get("/privacypolicy", async function (req, res) {
    res.render("help/privacypolicy");
});

// Lockedout Page for validaton attempt count

router.get("/lockedout", async function (req, res) {
    res.render("lockedout");

})

//  Error Handling Middleware

app.use(function (err, req, res, next) {

    // Default 500 Internal Server Error

    let statusCode = 500;

    // Check if error has a specific status code

    if (err.statusCode) {
        statusCode = err.statusCode;
    }

    // Rendering a custom error page based on the status code

    // res.status(statusCode);

    // res.render("customError",{statusCode})
    let errorTitle;
    let errorDesc;

    switch (statusCode) {

        case 400:
            errorTitle = "Bad Request";
            errorDesc = "The request could not be understood or was missing required parameters.";
            res.status(statusCode).render("customError.hbs", { statusCode, errorTitle, errorDesc });

        case 401:
            errorTitle = "Unauthorized";
            errorDesc = "Authentication is required, and the provided credentials are missing or invalid.";
            res.status(statusCode).render("customError.hbs", { statusCode, errorTitle, errorDesc });


        case 403:
            errorTitle = "Forbidden";
            errorDesc = "There is no way you can access the requested data. A 403 error announces that the data is off limits.";
            res.status(statusCode).render("customError.hbs", { statusCode, errorTitle, errorDesc });

            break;

        case 417:
            errorTitle = "Expectations Failed";
            errorDesc = "Expectation given in the request's Expect header could not be met."
            res.status(statusCode).render("customError.hbs", { statusCode, errorTitle, errorDesc });


        case 503:
            errorTitle = "Service Unavailable";
            errorDesc = "Server is temporarily unable to handle the request";
            res.status(statusCode).render("customError.hbs", { statusCode, errorTitle, errorDesc });

        case 505:
            errorTitle = "HTTP Version not supported";
            errorDesc = "The server can't communicate with the client ";
            res.status(statusCode).render("customError.hbs", { statusCode, errorTitle, errorDesc });

        default:
            errorTitle = "Internal Server Error";
            errorDesc = "The server encountered an error trying to process the request";
            res.status(statusCode).render("customError.hbs", { statusCode, errorTitle, errorDesc });
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