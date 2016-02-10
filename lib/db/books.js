var knex = require('../../db/knex');
var random = require('../random');

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
  getAllBooks: function(callback){
    Records()
      .join('Books', {'Bookrecords.book_id': 'Books.id'})
      .join('Authors', {'Bookrecords.author_id': 'Authors.id'})
      .then(function(results){
        console.log(results);
        callback(results);
      })
  },

  getSingleBook: function(id, callback){
    Records()
      .join('Books', {'Bookrecords.book_id': 'Books.id'})
      .join('Authors', {'Bookrecords.author_id': 'Authors.id'})
      .where({'Bookrecords.book_id': id})
      .then(function(results){
        console.log(results);
        callback(results);
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
    console.log('lib/db/updateRecord:');
    console.log(record);
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
