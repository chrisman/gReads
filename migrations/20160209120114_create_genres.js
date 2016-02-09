exports.up = function(knex, Promise) {
  return knex.schema.createTable('Genres', function(t){
    t.increments();
    t.string('genre');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Genres');
};
