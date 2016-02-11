var express = require('express');
var router = express.Router();
var db = require('../lib/db/authors');
var author = require('../lib/validate_author');

////////////
// CREATE //
////////////

// add an author
router.get('/new', function(req, res, next){
  db.getBooks(function(books){
    res.render('authors/new', {
      books: books
    });
  });
});
router.post('/', function(req, res, next) {
  var errors = author.has_errors(req.body);

  if (errors.length) {
    db.getBooks(function(books){
      res.render('authors/new', {
        errors: errors , 
        books: books
      });
    });
  } else {
    db.newAuthor(req.body, function(r){
      res.redirect('/authors');
    });
  }
});

//////////
// READ //
//////////

// list all authors
router.get('/', function(req, res, next) {
  db.getAllAuthors(function(authors){
    res.render('authors/show',{
      authors: authors
    });
  });
});

// list one author
router.get('/:id', function(req, res, next) {
  res.send('just one authos');
});

////////////
// UPDATE //
////////////

// get edit form
router.get('/:id/edit', function(req, res, next) {
  res.send('edit form!');
});

// post update
router.post('/:id', function(req, res, next) {
  res.send('updates!');
});

////////////
// DELETE //
////////////

// remove a author
router.get('/:id/delete', function(req, res, next) {
  res.send('sure you wanna delete?');
});
router.post('/:id/delete', function(req, res, next) {
  res.send('bah leeted');
});

module.exports = router;
