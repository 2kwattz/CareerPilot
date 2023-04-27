const request = require('request');
const cheerio = require('cheerio');
const url = 'https://india.recruit.net/trending-companies';
const fs = require('fs');

request(url,callback);

function callback(error,response,html){

    if(error){
        console.log(error)
    }
    else{

        const $ = cheerio.load(html);
        let mncArray = $('.row .tc-item .des span a');
        for(let i=0;i<=5;i++){

            var resultArray = [];


            console.log(mncArray);
            fs.writeFile('topMncs2.txt', mncArray,cb)
    
        }
    }
}

function cb(error,data){
  console.log(data)
}