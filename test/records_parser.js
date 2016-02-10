var chai = require('chai');
var assert = require('assert');
var parse = require('../lib/records_parser')
var expect = chai.expect;

var data = [ 
  { id: 9, book_id: 1, author_id: 1 },
  { id: 10, book_id: 1, author_id: 5 },
  { id: 11, book_id: 1, author_id: 6 },
  { id: 12, book_id: 2, author_id: 2 },
  { id: 13, book_id: 3, author_id: 3 },
  { id: 14, book_id: 4, author_id: 4 },
  { id: 15, book_id: 6, author_id: 4 },
  { id: 16, book_id: 5, author_id: 4 },
  { id: 20, book_id: 13, author_id: 5 } 
];

var bookone = [ 
  { id: 9, book_id: 1, author_id: 1 },
  { id: 10, book_id: 1, author_id: 5 },
  { id: 11, book_id: 1, author_id: 6 }
];

var bookone_expectation = [
  { 1: [1, 5, 6]}
];

var authorone = [
  { id: 14, book_id: 4, author_id: 4 },
  { id: 15, book_id: 6, author_id: 4 },
  { id: 16, book_id: 5, author_id: 4 }
];

var authorone_expectation = [
  { 4: [4, 6, 5]}
];

describe('authors per book', function(){
  it('returns one book with an array of authors', function(){
    expect(parse.authors_per_book(bookone)).to.eql(bookone_expectation);
  });
});

describe('books per author', function(){
  it('returns one author with an array of books', function(){
    expect(parse.books_per_author(authorone)).to.eql(authorone_expectation);
  });
});
