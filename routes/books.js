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
  console.log(req.body);
  var errors = book.has_errors(req.body);

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
    var book_obj = {};
    book_obj.title = req.body.title;
    book_obj.genre_id = req.body.genre;
    book_obj.description = req.body.description;
    book_obj.cover_url = req.body.cover_url;

    db.addBook(book_obj, function(result){
      console.log(result);
      var record_obj = {};
      record_obj.book_id = result[0];
      record_obj.author_id = req.body.author_id;

      db.addRecord(record_obj, function(result){
        res.redirect('/books');
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
  db.getSingleBook(req.params.id, function(result){
    res.render('books/index', {
      books: result
    });
  });
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
  db.getSingleBook(req.params.id, function(result){
    res.render('books/index', {
      books: result,
      include_delete: true
    });
  });
});
router.post('/:id/delete', function(req, res, next) {
  db.deleteBook(req.params.id, function(result){
    db.deleteRecords(req.params.id, function(result){
      res.redirect('/books');
    });
  });
});

module.exports = router;
