const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

async function testFunction() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://scholarships.gov.in/');

    // SCHOLARSHIP DATA TO INCLUDE

    // Name of the Scholarship/Scheme
    // Starting Date and Ending date
    // link
    const scholarshipData = await page.$$('#accordion11');

    await page.click('nav-link  tabs-bg-default text-white active');
    await page.click('fa pull-right');

    for(const scholarshipRows of scholarshipData){
        const singleScholarshipRow = await page.evaluate(el => el.innerText, scholarshipRows);
        console.log("singleScholarshipRow")
    }

}
console.log("success")
