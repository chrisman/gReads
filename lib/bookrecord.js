
module.exports = {
  
  hello: function(){
    return 'hello world';
  },

  group_author_by_book: function(arr){
    return arr.map(function(curr, idx, arr){
      curr.authors = [];
      var auth_obj = {};
      auth_obj.id = curr.author_id;
      auth_obj.first_name = curr.first_name;
      auth_obj.last_name = curr.last_name;
      auth_obj.biography = curr.biography;
      auth_obj.portrait_url = curr.portrait_url;
      curr.authors.push(auth_obj);
      return curr;
    });
  },

  group_authors_by_book: function(arr){
    arr = arr.reduce(function(acc, curr, idx, arr){
      
    }, []);
    return arr;
  }

}
