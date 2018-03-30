// require mongoose
var mongoose = require("mongoose");

// require the connection
var db = require("../config/connection.js");
// schema class
var Schema = mongoose.Schema;


// article schema
var articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  preview: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  notes:[]
});

// model creation 
var article = mongoose.model("article", articleSchema);
// Export the model
module.exports = article;
