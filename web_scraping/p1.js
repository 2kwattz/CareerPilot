const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const { AsyncLocalStorage } = require('async_hooks');

async function scrap(){

    let url = `https://simpleflying.com/category/aviation-news/`;
    let adbsUrl = `https://globe.adsbexchange.com/`;

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(function(){
        return Array.from(document.querySelectorAll('.bc-title-link')).map(x => x.textContent);
    })

    const adbsPage = await browser.newPage();
    await adbsPage.goto(adbsUrl);
    
    await fs.writeFile("PlaneData.csv", news.join("\r\n"));

    await browser.close();
    console.log(news)

}

scrap();


