var express = require('express');
var router = express.Router();
var db = require('../lib/db/books');


// CREATE -- add a book //
router.get('/new', function(req, res, next){
  db.getGenres(function(genres){
    res.render('books/new',{
      genres: genres
    });
  });
});
router.post('/', function(req, res, next) {
  res.send('book added');
});

// READ -- list all books //
router.get('/', function(req, res, next) {
  db.getAllBooks(function(results){
    res.render('books/index', { 
      title: 'READ A BOOK',
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
