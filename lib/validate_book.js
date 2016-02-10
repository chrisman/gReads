module.exports = {

  has_errors: function(obj){
    var errors = [];

    if (obj.title === '')
      errors.push('Title cannot be blank');
    if (obj.cover_url === '')
      errors.push('Cover URL cannot be blank');
    if (obj.description === '')
      errors.push('Description cannot be blank');

    return errors;

  }

}
