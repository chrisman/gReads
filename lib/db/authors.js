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


//////////
// READ //
//////////

  getAuthors: function(callback){
    Authors()
      .select('first_name', 'last_name', 'id')
      .then(function(results){
        callback(results);
      });
  },

  getBooks: function(callback){
    Books()
      .then(function(results){
        callback(results);
      });
  }

////////////
// UPDATE //
////////////


////////////
// DELETE //
////////////


};
