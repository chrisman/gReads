var knex = require('../../db/knex')

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

module.exports = {

  getAllBooks: function(callback){
    Records()
      .join('Books', {'Books.id':'Bookrecords.book_id'})
      .join('Authors', {'Authors.id':'Bookrecords.author_id'})
      .then(function(results){
        console.log(results);
        callback(results);
      })
  },

  getGenres: function(callback){
    Genres()
      .select('genre')
      .then(function(results){
        console.log(results);
        callback(results);
      });
  },

  getAuthors: function(callback){
    Authors()
      .select('first_name', 'last_name', 'id')
      .then(function(results){
        callback(results);
      });
  },

  addBook: function(book, callback){
    Books()
      .insert(book)
      .then(function(result){
        callback(result);
      });
  },

  addRecord: function(record, callback){
    Records()
      .insert(record)
      .then(function(result){
        callback(result);
      });
  }

};
