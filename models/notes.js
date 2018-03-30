// require mongoose
var mongoose = require("mongoose");

// require the connection
var db = require("../config/connection.js");
// schema class
var Schema = mongoose.Schema;

// article schema
var notesSchema = new Schema({
  notes: {
    type: String,
    required: true
  },
  artid: {
    type: String,
    required: true
  }
});

// model creation
var notes = mongoose.model("notes", notesSchema);
// Export the model
module.exports = notes;
