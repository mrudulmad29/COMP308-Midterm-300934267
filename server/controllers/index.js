let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');

// define the User Model
let userModel = require('../models/users');
let User = userModel.User; // alias for the user Model - use object

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home',
    displayName: req.user ? req.user.displayName : '' });
  }

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About',
    displayName: req.user ? req.user.displayName : '' });
  }

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Products',
    displayName: req.user ? req.user.displayName : '' });
  }

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services',
    displayName: req.user ? req.user.displayName : '' });
  }

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact',
    displayName: req.user ? req.user.displayName : '' });
  }

module.exports.displayLoginPage = (req, res, next) => {
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    //return;
  } else {
    return res.redirect('/'); // redirects to the root
  }
}


module.exports.processLoginPage = 
    passport.authenticate('local', {
    successRedirect: '/contact-list',
    failureRedirect: '/login',
    failureFlash: 'bad login',
    failureMessage: 'bad login'
  });


module.exports.displayRegistrationPage = (req, res, next) => {
  if(!req.user) {
    // render the registration page
    res.render('auth/register', {
      title: "Register",
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });

  } else {
    return res.redirect('/'); // user is already registered
  }
}

module.exports.processRegistrationPage = (req, res, next)=>{

  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(
    newUser,
    req.body.password,
    //perform registration
    (err) => {
      // check if there is an error
      if(err) {
        console.log('Error inserting new user');
        if(err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User Already Exists');
        }
        return res.render('auth/register', {
          title: "Register",
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      // if no error, then registration is successful

      // redirect the user
      return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/');
      });
    });
}

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/'); // redirect back to home page
}
