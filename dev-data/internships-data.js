const request = require('request');
const cheerio = require('cheerio');

let internshipCategory = `Web Development`;

let linkedinSource = `https://www.linkedin.com/jobs/search/?currentJobId=3569088404&f_JT=I&geoId=102713980&keywords=${internshipCategory}&location=India&originalSubdomain=in&refresh=true`;
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
    const lnInternshipsTitleArray = $('.jobs-search__results-list .base-search-card__title').text();
    console.log(lnInternshipsTitleArray);
    
}