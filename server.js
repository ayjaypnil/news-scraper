

// EXPRESS
var express = require("express");

var app = express();
var port = process.env.PORT || 3000;

// CHEERIO
var cheerio = require("cheerio");
var request = require("request");

// EJS
var ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.static("public"));

// BODY-PARSER
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// REQUIRE THE CONNECTION TO MONGOOSE/MONGODB
var db = require("./config/connection.js");
// REQUIRE THE SCHEMA
var article = require("./models/article");
// REQUIRE THE SCRAPER
var scraper = require("./controllers/scraper.js");

// EXPRESS: Get Route
app.get("/", function(req, res) {
    // res.render(__dirname + "/views/home.ejs");
  	article.find({}, function(error, data) {
      if (error) {
        console.log(error);
      } else {
        res.render("home.ejs", {data: data});
      }
    });
 });

 app.get("/scraper", function(req, res) {
    scraper.scraper()
    
   
 });

//   EXPRESS: APP is Listening
  app.listen(port, function() {
    console.log("Scraping App is listening on PORT: " + port);
  });