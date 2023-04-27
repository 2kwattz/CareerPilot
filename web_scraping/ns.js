const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function dataScraper(){

    const url = 'https://www.w3schools.com/';

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
   await page.goto(url, {waitUntil: 'networkidle2'});

   var data = await page.evaluate(function(){


    return Array.from(document.querySelector('.w3-bar w3-card-2 notranslate a')).map(x =>{
        x.textContent;
    });  
})


await fs.writeFile("flightData.txt", data.join("/t/r"))
await browser.close();

}

dataScraper();