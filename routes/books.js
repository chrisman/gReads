var express = require('express');
var router = express.Router();
var db = require('../lib/db/books');
var random = require('../lib/db/random');
var book = require('../lib/validate_book');

////////////
// CREATE //
////////////

// add a book
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
      var record_obj = {};
      record_obj.book_id = result[0];
      record_obj.author_id = req.body.author_id;

      db.addRecord(record_obj, function(result){
        res.redirect('/books');
      });
    });
  }
});

//////////
// READ //
//////////

// list all books
router.get('/', function(req, res, next) {
  db.getAllBooks(function(books){
    random.getBook(function(random_book){
      random.getAuthor(function(random_author){
        res.render('books/index', { 
          books: books ,
          random_book: random_book , 
          random_author: random_author ,
          include_options: true
        });
      });
    });
  });
});

// list one book
router.get('/:id', function(req, res, next) {
  db.getSingleBook(req.params.id, function(book){
    res.render('books/index', {
      books: book
    });
  });
});

////////////
// UPDATE //
////////////

// get edit form
router.get('/:id/edit', function(req, res, next) {
  db.getGenres(function(genres){
    db.getAuthors(function(authors){
      db.getSingleBook(req.params.id, function(book){
        res.render('books/edit', {
          book: book,
          genres: genres,
          authors: authors
        });
      });
    });
  });
});

// post update
router.post('/:id', function(req, res, next) {
  var book_id = req.params.id;
  var errors = book.has_errors(req.body);

  // handle errors
  if (errors.length){
  db.getGenres(function(genres){
    db.getAuthors(function(authors){
      db.getSingleBook(book_id, function(book){
        res.render('books/edit',{
          errors: errors,
          book: book,
          genres: genres,
          authors: authors
        });
      });
    });
  });

  // no errors:
  } else { 
    var book_obj = {};
    book_obj.id = book_id;
    book_obj.title = req.body.title;
    book_obj.genre_id = req.body.genre;
    book_obj.description = req.body.description;
    book_obj.cover_url = req.body.cover_url;

    db.updateBook(book_obj, function(result){
      var record_obj = {};
      record_obj.book_id = book_id;
      record_obj.author_id = req.body.author_id;

      db.updateRecord(record_obj, function(result){
        res.redirect('/books/' + book_id);
      });
    });
  }
});

////////////
// DELETE //
////////////

// remove a book
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
