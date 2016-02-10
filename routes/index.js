var express = require('express');
var router = express.Router();
var random = require('../lib/db/random');

/* GET home page. */
router.get('/', function(req, res, next) {
  random.getBook(function(book){
    random.getAuthor(function(author){
      res.render('index', {
        book: book,
        author: author
      });
    });
  });
});

module.exports = router;
