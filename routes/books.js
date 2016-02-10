var express = require('express');
var router = express.Router();
var db = require('../lib/db/books');
var book = require('../lib/validate_book');


// CREATE -- add a book //
router.get('/new', function(req, res, next){
  db.getGenres(function(genres){
    db.getAuthors(function(authors){
      res.render('books/new',{
        genres: genres,
        authors: authors
      });
    });
  });
});
router.post('/', function(req, res, next) {
  var errors = book.has_errors(req.body);
  console.log(req.body);
  console.log(errors);

  if (errors.length){
    db.getGenres(function(genres){
      db.getAuthors(function(authors){
        res.render('books/new', {
          errors: errors,
          genres: genres,
          authors, authors
        });
      });
    });
  } else { // no errors
    db.addBook(req.body, function(result){
      db.addRecord(req.body, function(result){
        console.log(result);
        res.render('/books');
      });
    });
  }
});

// READ -- list all books //
router.get('/', function(req, res, next) {
  db.getAllBooks(function(results){
    res.render('books/index', { 
      books: results 
    });
  });
});

// READ -- list one book //
router.get('/:id', function(req, res, next) {
  res.render('books/show', {});
});

// UPDATE -- edit a book //
router.get('/:id/edit', function(req, res, next) {
  res.send('edit form');
});
router.post('/:id', function(req, res, next) {
  res.send('book updates');
});

// DELETE -- remove a book //
router.get('/:id/delete', function(req, res, next) {
  res.send('delete fomr');
});
router.post('/:id/delete', function(req, res, next) {
  res.send('book deleted');
});

module.exports = router;
