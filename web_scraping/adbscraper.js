const axios = require('axios');
const puppeteer = require('puppeteer');

(async () =>{

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const page1 = await page.goto('https://globe.adsbexchange.com/');
    console.log(page1.isJavaScriptEnabled());
    

})
