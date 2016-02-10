var chai = require('chai');
var assert = require('assert');
var book = require('../lib/validate_book')

describe('has errors', function(){
  it('title must not be empty', function(){
    assert.equal(book.has_errors({
      title: '',
      cover_url: 'this url',
      description: 'this desc'
    }), ['Title cannot be blank']);
  });

  it('cover_url must not be emtpy', function(){
    assert.equal(book.has_errors({
      title: 'this title',
      cover_url: ''
    }), ['Cover URL cannot be blank']);
  });

  it('description must not be emtpy', function(){
    assert.equal(book.has_errors({
      title: 'this title',
      cover_url: 'this url',
      description: ''
    }), ['Description cannot be blank']);
  });
});
