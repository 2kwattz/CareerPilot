const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.espn.in/cricket/series/8048/game/1359495/lucknow-super-giants-vs-punjab-kings-21st-match-indian-premier-league-2023';
request(url, callback);
function callback(error,response,html){
    if(error){
     
    }
    else{

        handelHtml(html);

    }

    function handelHtml(html){

        let $ = cheerio.load(html);
        let eleArray = $(".commentary-item  .item-wrapper .description b");
        let text = $(eleArray[0]).text();
        console.log(text);


    }
}