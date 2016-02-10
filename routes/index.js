var express = require('express');
var router = express.Router();
var db = require('../lib/db/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getRandomBook(function(book){
    res.render('index', {
      book: book
    });
  });
});

module.exports = router;
