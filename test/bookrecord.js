var chai = require('chai');
var assert = require('assert');
var should = chai.should();
var br = require('../lib/bookrecord');

var sample_record = [ 
  { id: 9, book_id: 1, author_id: 1 },
  { id: 10, book_id: 1, author_id: 5 },
  { id: 11, book_id: 1, author_id: 6 }
];

var sample_record_expectation = [ 
  { book_id: 1, authors: [1, 5, 6] }
];

///////////////////
// HERE BE TESTS //
///////////////////

describe('hello', function(){
  it('should work', function(){
    assert.equal(br.hello(), 'hello world');
  });
});

describe('reduce book_id', function(){
  it('should return one object per book_id, with an array of authors', function(){
    assert.equal(br.book_reduce(sample_record), sample_record_expectation);
  });
});
