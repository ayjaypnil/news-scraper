// CHEERIO
var cheerio = require("cheerio");
var request = require("request");

// Where the scraping results will be saved and can be accessed
var article = require("../models/article.js");



function scraper(){

  var results = [];
  var title;
  var preview;
  var link;
  var articleScraped;
  // CHEERIO: SCRAPING
    request("http://www.insidethehall.com/", function(error, response, html) {
      var $ = cheerio.load(html);
      $("div.post.small").each(function(i, element) {
        var title = $(element).find("h2 > a").text().trim();
        var preview = $(element).find("p > a.excerpt").text().trim();
        var link = $(element).find("p > a").attr("href");
    
        results.push({title: title, preview: preview, link: link})

        articleScraped = new article(
            {
                title: [title],
                preview: [preview],
                link: [link], 
            }
          )

        			articleScraped.save(function(error, doc){
				  		if (error){
                console.log("error: ", error);
                
				  		}else{
				  			console.log("new article scraped:", doc);
              }
            });
      });
      console.log("Scraping.....");
    });
};

exports.scraper = scraper;