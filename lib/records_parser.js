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
    return this.group_by(arr, 'author_id', 'book_id');
  }

}
