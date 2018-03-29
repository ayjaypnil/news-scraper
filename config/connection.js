// MONGO MONGOOSE CONNECTIONS
var mongojs = require("mongojs");
var mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scraper");
var db = mongoose.connection;

// mongoose errors
db.on("error", function(error) 
{
  console.log("Mongoose Error: ", error);
});

//Mongoose connection to db
db.once("open", function() 
{
  console.log("Mongoose connection successful!");
});

// export the database
module.exports = db;