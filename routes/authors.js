var express = require('express');
var router = express.Router();
var db = require('../lib/db/authors');
var author = require('../lib/validate_author');

////////////
// CREATE //
////////////

// add an author
router.get('/new', function(req, res, next){
  res.send('new author form');
});
router.post('/', function(req, res, next) {
  res.send('new auuthor created');
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
