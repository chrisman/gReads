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

  showAuthor: function(id, callback){
    Authors()
      .where('id', id)
      .then(function(result){
        callback(result);
      });
  },

////////////
// UPDATE //
////////////


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
