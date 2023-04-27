const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require('fs');
const htmlparser = require('htmlparser2')
const puppeteer = require('puppeteer');

let url = 'https://globe.adsbexchange.com/';

// axios
//     .get(url)
//     .then((response) => {
//         var adbsData = response.data;
//         const $ = cheerio.load(response);
//         let planesTable = $('table[class=planesTable]'); 
//         console.log(planesTable);
//         fs.writeFileSync('PlaneData.txt', `${adbsData}`);
//     })
//     .catch((error) => {
//         console.error(error)
//     });
    
    (async () => {

        const url = 'https://globe.adsbexchange.com/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2'});
        // await page.screenshot({ path: 'example2.png' });

        const data = await page.evaluate(() => {

            let title = 'Live Flight Tracking ';

            let flightTable =  document.querySelector('table[id="planesTable"]').innerHTML;
            console.warn('DO NOT STEAL MY SCRIPT!!');
            
            return{
                title,
                flightTable,
                
            }
            fs.writeFileSync('PlaneData.txt', `${flightTable}`);
            debugger;
            
            
        })

        
        console.log(data);

        await browser.close();

        

    })();

      //   // fs.writeFileSync('PlaneData.txt',`${flightData.evaluate()}`)
      //   const flightData = await page.$$eval('table', function(){
      //     return flightData;
      //   });
      
      //   await browser.close();
      // })();


