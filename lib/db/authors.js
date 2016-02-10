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

  addRecord: function(record, callback){
    Records()
      .insert(record)
      .then(function(result){
        callback(result);
      });
  },

  addBook: function(book, callback){
    Books()
      .returning('id')
      .insert(book)
      .then(function(result){
        callback(result);
      });
  },

//////////
// READ //
//////////

  // TODO: how reduce to 1 book per authors?
  getAllAuthors: function(callback){
    Authors()
      .then(function(r){
        callback(r);
      });
  },

  getAuthorSeries: function(array, callback){
    Authors()
      .whereIn('id', array)
      .then(function(result){
        callback(result);
      });    
  },

  getSingleBook: function(id, callback){
    Records()
      .where({'book_id': id})
      .then(function(results){
        var author_array = parse.authors_per_book(results);
        Authors()
          .whereIn('id', author_array[0][id])
          .then(function(authors){
            Books()
              .where('id', id)
              .then(function(book){
                book[0].authors = authors;
                callback(book);
              });
          });  
      })
  },

  getRandomBook: function(callback){
    this.getAllBooks(function(r){
      callback(random(r));
    });
  },

  getGenres: function(callback){
    Genres()
      .then(function(results){
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

////////////
// UPDATE //
////////////

  updateBook: function(book, callback){
    Books()
      .where('id', book.id)
      .update(book)
      .then(function(result){
        callback(result);
      });
  },

  updateRecord: function(record, callback){
    Records()
      .where({
        'book_id': record.book_id,
      })
      .update(record)
      .then(function(result){
        callback(result);
      });
  },

////////////
// DELETE //
////////////

  deleteBook: function(book, callback){
    Books()
      .where('id', book)
      .delete()
      .then(function(result){
        callback(result);
      });
  },

  deleteRecords: function(book, callback){
    Records()
      .where('book_id', book)
      .delete()
      .then(function(result){
        callback(result);
      });
  }

};
