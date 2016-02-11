var knex = require('../../db/knex');
var random = require('../random');
var parse = require('../records_parser');

// KNEX RETURNS
function Records(){
  return knex('Bookrecords');
}
function Genres(){
  return knex('Genres');
}
function Authors(){
  return knex('Authors');
}
function Books(){
  return knex('Books');
}

module.exports = {

////////////
// CREATE //
////////////

  newAuthor: function(obj, callback){
    Authors()
      .insert(obj)
      .then(function(result){
        callback(result);
      });
  },

//////////
// READ //
//////////

  getAuthors: function(callback){
    Authors()
      .join('Bookrecords', {'Bookrecords.author_id': 'Authors.id'})
      .join('Books', {'Bookrecords.book_id': 'Books.id'})
      .select(
        'Bookrecords.book_id as book_id',
        'Bookrecords.author_id as author_id',
        'Authors.first_name as first_name',
        'Authors.last_name as last_name',
        'Authors.portrait_url as portrait_url',
        'Authors.biography as biography',
        'Books.title as title',
        'Books.cover_url as cover_url',
        'Books.description as description'
      )
      .then(function(results){
        callback(results);
      });
  },

  showAuthor: function(id, callback){
    Authors()
      .join('Bookrecords', {'Bookrecords.author_id': 'Authors.id'})
      .join('Books', {'Bookrecords.book_id': 'Books.id'})
      .select(
        'Bookrecords.book_id as book_id',
        'Bookrecords.author_id as author_id',
        'Authors.first_name as first_name',
        'Authors.last_name as last_name',
        'Authors.portrait_url as portrait_url',
        'Authors.biography as biography',
        'Books.title as title',
        'Books.cover_url as cover_url',
        'Books.description as description'
      )
      .where('Authors.id', id)
      .then(function(results){
        callback(results);
      });
  },

  getBooks: function(callback){
    Books()
      .then(function(results){
        callback(results);
      });
  },

////////////
// UPDATE //
////////////

  updateAuthor: function(obj, callback){
    Authors()
      .where('id', obj.id)
      .update(obj)
      .then(function(result){
        callback(result);
      });
  },

////////////
// DELETE //
////////////

  destoryAuthor: function(author_id, callback){
    Authors()
      .where('id', author_id)
      .delete()
      .then(function(result){
        callback(result);
      });
  },

  destroyRecords: function(author_id, callback){
    Records()
      .where('author_id', author_id)
      .delete()
      .then(function(result){
        callback(result);
      });
  }

};
