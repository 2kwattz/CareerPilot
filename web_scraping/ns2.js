const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function scrapData(){

    let url = 'https://www.facebook.com';

    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    const title = await page.title();
    const urll = await page.url();    
    
    console.log(title, urll);
    await browser.close();
};

scrapData();