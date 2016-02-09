exports.up = function(knex, Promise) {
  return knex.schema.createTable('Books', function(t){
    t.increments();
    t.string('title');
    t.integer('genre_id');
    t.text('description');
    t.string('cover_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Books');
};
