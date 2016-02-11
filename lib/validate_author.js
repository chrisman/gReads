module.exports = {

  has_errors: function(obj){
    var errors = [];

    if (obj.first_name  === '')
      errors.push('First name cannot be blank');
    if (obj.last_name  === '')
      errors.push('Last name cannot be blank');
    if (obj.portrait_url === '')
      errors.push('Portrait URL cannot be blank');
    if (obj.biography === '')
      errors.push('Biography cannot be blank');

    return errors;

  }

}
