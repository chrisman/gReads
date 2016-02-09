var knex = require('../../db/knex')

// KNEX RETURNS
function Records(){
  return knex('Bookrecords');
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
  }

};
