exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('Genres').del(), 

    // Inserts seed entries
    knex('Genres').insert({genre: 'Python'}),
    knex('Genres').insert({genre: 'JavaScript'})
  );
};
