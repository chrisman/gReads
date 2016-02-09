exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('Bookrecords').del(), 

    // Inserts seed entries
    knex('Bookrecords').insert({
      book_id: 1,
      author_id: 1
    }),

    knex('Bookrecords').insert({
      book_id: 1,
      author_id: 5
    }),

    knex('Bookrecords').insert({
      book_id: 1,
      author_id: 6
    }),

    knex('Bookrecords').insert({
      book_id: 2,
      author_id: 2
    }),

    knex('Bookrecords').insert({
      book_id: 3,
      author_id: 3
    }),

    knex('Bookrecords').insert({
      book_id: 4,
      author_id: 4
    }),

    knex('Bookrecords').insert({
      book_id: 5,
      author_id: 4
    }),

    knex('Bookrecords').insert({
      book_id: 6,
      author_id: 4
    })
  );
};
