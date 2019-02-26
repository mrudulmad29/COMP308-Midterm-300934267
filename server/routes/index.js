/* File Name: index.js
Author Name: Mrudul Dubey
Student Id: 300934267
Web App Name: My Favourite Books */

// modules required for routing
let express = require('express');
let router = express.Router();
//let mongoose = require('mongoose');

let indexController = require('../controllers/index');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* GET - display login page */
router.get('/login', indexController.displayLoginPage);

/* POST - Process Login page */
router.post('/login', indexController.processLoginPage);

/* GET - display the registration page */
router.get('/register', indexController.displayRegistrationPage);

/* POST - Process the registration page */
router.post('/register', indexController.processRegistrationPage);

/* GET - perform the logout request */
router.get('/logout', indexController.performLogout);

module.exports = router;
