const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async function () {

    const url = 'https://simpleflying.com/category/aviation-news/';

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await page.evaluate(function () {

        var newsTitle1 = document.getElementsByClassName('bc-title')[0].innerText;
        var newsTitle2 = document.getElementsByClassName('bc-title')[1].innerText;
        var newsTitle3 = document.getElementsByClassName('bc-title')[2].innerText;
        var newsTitle4 = document.getElementsByClassName('bc-title')[3].innerText;
        var newsTitle5 = document.getElementsByClassName('bc-title')[4].innerText;
        var newsTitle6 = document.getElementsByClassName('bc-title')[5].innerText;
        var newsTitle7 = document.getElementsByClassName('bc-title')[6].innerText;

        var nt = [newsTitle1,newsTitle2,newsTitle3,newsTitle4,newsTitle5,newsTitle6,newsTitle7];

        return nt;

        
    })

    debugger;
    await browser.close();

    console.log(data);

    const arrayResult = Array.from(data);
    await fs.writeFile('flightDataLatest.txt', `${arrayResult}`);


})()