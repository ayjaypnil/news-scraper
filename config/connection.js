// MONGO MONGOOSE CONNECTIONS
var mongojs = require("mongojs");
var mongoose = require("mongoose");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
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