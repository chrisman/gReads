// lib/records_parser.js

module.exports = {
  
  group_by: function( arr, key, value ){
    var collection = {};
    arr.forEach(function(o){
      var val = o[key];
      collection[val] = collection[val] || [];
      collection[val].push(o[value]);
    });
    return [collection];
  },

  authors_per_book: function(arr){
    return this.group_by(arr, 'book_id', 'author_id');
  },

  books_per_author: function(arr){
    return arr.reduce(function(acc, curr, idx, arr){

      var author_obj = curr;
      var book_obj = {}
      book_obj.book_id = curr.book_id;
      book_obj.title = curr.title;
      book_obj.cover_url = curr.cover_url;
      book_obj.description = curr.description;
      
      author_obj.books = [];
      author_obj.books.push(book_obj);

      acc.push(author_obj);
      return acc;

    }, []);
  }

}
