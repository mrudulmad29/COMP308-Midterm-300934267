/* File Name: books.js
Author Name: Mrudul Dubey
Student Id: 300934267
Web App Name: My Favourite Books */

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);
