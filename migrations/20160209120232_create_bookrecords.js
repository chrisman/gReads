exports.up = function(knex, Promise) {
  return knex.schema.createTable('Bookrecords', function(t){
    t.increments();
    t.integer('book_id');
    t.integer('author_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Bookrecords');
};
