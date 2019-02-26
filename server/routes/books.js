/* File Name: books.js
Author Name: Mrudul Dubey
Student Id: 300934267
Web App Name: My Favourite Books */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');


function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET Contact List page - READ Operation */
router.get('/', requireAuth, (req, res, next) =>{
  bookModel.find((err, books) => {
      if(err) {
          return console.error(err);
      }
      else {
         // console.log(contactList);

          res.render('books/index', {
              title: 'Book List',
              books: books,
              displayName: req.user ? req.user.displayName : ''
          });
          
      }
  });
});

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add', requireAuth, (req, res, next) => {
  res.render('books/add', {
      title: 'Add New Book',
      displayName: req.user ? req.user.displayName : ''
  });
});

/* POST Route for processing the Add page */
router.post('/add', requireAuth, (req, res, next) => {

  let newBook = bookModel({
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "age": req.body.age
  });

  bookModel.create(newBook, (err, bookModel) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the contact list
          res.redirect('/books');
      }
  });
});

/* GET request - display the Edit page */
router.get('/edit/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;

  bookModel.findById(id, (err, bookObject) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else
      {
          // show the edit view
          res.render('books/edit', {
              title: 'Edit book',
              book: bookObject,
              displayName: req.user ? req.user.displayName : ""
          });
      }
  });
});

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;

  let updatedBook = bookModel({
      "_id": id,
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "age": req.body.age
  });

  bookModel.update({_id: id}, updatedBook, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the contact list
          res.redirect('/books');
      }
  })
});

/* GET request to perform the delete action */
router.get('/delete/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;

  bookModel.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the contact list
          res.redirect('/books');
      }
  });
});

// define the book model
let bookModel = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  bookModel.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books:books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {
    title: "Add a New Book",
    books: bookModel
});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = bookModel({
    "Title":req.body.title,
    "Price":req.body.price,
    "Author":req.body.author,
    "Genre":req.body.genre
});

bookModel.create(newBook, (err, books) => {
    if(err) {
        console.log(err);
        res.end(err);
    } 
    else {
        // takes the user back to the book-list page
        res.redirect('/books');
    }
});

});


// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  bookModel.findById(id, (err, bookObject) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // show the edit view
          res.render('books/edit', {
              title: "Edit Book",
              books: bookObject,
          }); 
        } 
      });
});



// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedBook = bookModel({
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author":req.body.author,
      "Genre":req.body.genre
  });

  bookModel.update({_id: id}, updatedBook, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the contact-list
          res.redirect('/books');
      }
  })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  bookModel.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the contact list
          res.redirect('/books');
      }
  });
});


module.exports = router;
