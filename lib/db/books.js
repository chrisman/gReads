var knex = require('../../db/knex');
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
  getAllBooks: function(callback){
    Books()
      .join('Bookrecords', {'Bookrecords.book_id': 'Books.id'})
      .join('Authors', {'Bookrecords.author_id': 'Authors.id'})
      .join('Genres', {'Books.genre_id': 'Genres.id'})
      .select(
        'Genres.genre as genre',
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
      .then(function(result){
        callback(result);
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
    Books()
      .join('Bookrecords', {'Bookrecords.book_id': 'Books.id'})
      .join('Authors', {'Bookrecords.author_id': 'Authors.id'})
      .join('Genres', {'Books.genre_id': 'Genres.id'})
      .select(
        'Genres.genre as genre',
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
      .where('Books.id', id)
      .then(function(result){
        callback(result);
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
