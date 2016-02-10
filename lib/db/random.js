var knex = require('../../db/knex');
var random = require('../random');

// KNEX RETURNS
function Authors(){
  return knex('Authors');
}
function Books(){
  return knex('Books');
}

module.exports = {

  getBook: function(callback){
    Books()
      .then(function(r){
        callback(random(r));
      })
  },

  getAuthor: function(callback){
    Authors()
      .then(function(r){
        callback(random(r));
      })
  }

};
