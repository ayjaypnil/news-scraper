

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
var notes = require("./models/notes");
// REQUIRE THE SCRAPER
// var scraper = require("./controllers/scraper.js");

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

 app.get("/scrape", function(req, res) {

  var results = [];
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
                link: [link]
            }
          )

        			articleScraped.save(function(error, doc){
				  		if (error){
                console.log("error: ", error);
                
				  		}else{
				  			console.log("new article scraped:", doc);
              }
            });
                  console.log("Scraping.....");
      });
      res.redirect("/scraping");
    });
 });

 app.post("/submit", function(req, res) {
   var artid = req.body.id;
   var note = req.body.note;
     console.log("=============================");
     console.log("post route");
     console.log("=============================");
    var notes = new notes({
      notes: [note],
      artid: [artid]
    });

 	notes.save(function(error, doc){
      console.log("============");
      console.log("console.log", doc);
      notes.update({ $push: { artid: artid, notes: note } });
   });
   
 });

 app.get("/scraping", function(req, res) {
       res.render("scraping.ejs"); 
 });

 app.get("/:id", function(req, res) {
   var id = req.params.id;
  //   console.log("=============================");
   console.log("notes", notes);
   console.log("article", article);
  //  console.log("=============================");
 	  notes.find({ "artid" : id }, function(error, data) {
       console.log("This is the", data)
      res.render("comments.ejs", { data: data })
    });
 });

//   EXPRESS: APP is Listening
  app.listen(port, function() {
    console.log("Scraping App is listening on PORT: " + port);
  });

  