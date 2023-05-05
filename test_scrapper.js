const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = `https://www.worldometers.info/coronavirus/`

function scrapCovidData(){
    
    axios.get(url).then(urlResponse => {
        const $ = cheerio.load(urlResponse.data);
        console.log($.text())
    })
}

scrapCovidData();