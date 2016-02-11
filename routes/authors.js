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

    var author_obj = {};
    author_obj.first_name = req.body.first_name;
    author_obj.last_name = req.body.last_name;
    author_obj.portrait_url = req.body.portrait_url;
    author_obj.biography = req.body.biography;

    db.newAuthor(author_obj, function(r){
      res.redirect('/authors');
    });
  }
});

//////////
// READ //
//////////

// list all authors
router.get('/', function(req, res, next) {
  db.getAuthors(function(authors){
    console.log(authors);
    res.render('authors/show',{
      authors: authors,
      include_delete: false,
      include_options: true
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
  db.getBooks(function(books){
    db.showAuthor(req.params.id, function(author){
      console.log(author);
      res.render('authors/edit', {
        author: author[0],
        books: books,
        include_delete: false,
        include_options: false
      });
    });
  });
});

// post update
router.post('/:id', function(req, res, next) {
  var errors = author.has_errors(req.body);

  if (errors.length) {
    db.getBooks(function(books){
      db.showAuthor(req.params.id, function(author){
        res.render('authors/edit', {
          errors: errors,
          author: author[0],
          books: books,
          include_delete: false,
          include_options: false
        });
      });
    });
  } else {

    var author_obj = {};
    author_obj.id = req.params.id;
    author_obj.first_name = req.body.first_name;
    author_obj.last_name = req.body.last_name;
    author_obj.portrait_url = req.body.portrait_url;
    author_obj.biography = req.body.biography;

    db.updateAuthor(author_obj, function(r){
      res.redirect('/authors/' + req.params.id);
    });
  }
});

////////////
// DELETE //
////////////

// get delete confirmation
router.get('/:id/delete', function(req, res, next) {
  db.showAuthor(req.params.id, function(author){
    console.log(author);
    res.render('authors/show', {
      authors: author,
      include_delete: true,
      include_options: false
    });
  });
});
// post delete request
router.post('/:id/delete', function(req, res, next) {
  db.destoryAuthor(req.params.id, function(result){
    db.destroyRecords(req.params.id, function(result){
      res.redirect('/authors');
    });
  });
});

module.exports = router;
