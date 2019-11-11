const { Pool } = require('pg');

const pool = new Pool({
  database: 'critic_reviews',
});

pool.connect();

const get100Reviews = async (callback) => {
  await pool.query('SELECT * FROM reviews inner join critic ON critic.id = reviews.reviewer_id WHERE reviews.id > 0 and reviews.id <= 100')
    .then((res) => callback(null, res.rows))
    .catch((err) => callback(err));
};

const getOneReview = async (id, callback) => {
  // await pool.connect();
  await pool.query('SELECT * FROM reviews where reviews.id = $1', [id])
    .then((res) => callback(null, res.rows))
    .catch((err) => callback(err));
};

const postReview = async (data, callback) => {
  let newCriticId;
  // await pool.connect();
  await pool.query('INSERT INTO critic(user_name, user_photo, user_page) VALUES($1, $2, $3)', [data.user_name, data.user_photo, data.user_page]);
  await pool.query('SELECT id FROM critic WHERE user_name = $1', [data.user_name])
    .then((result) => {
      newCriticId = result.rows[0].id;
    })
    .catch((err) => callback(err));
  await pool.query('INSERT INTO reviews(movie_name, review, rate, rank, publication, review_date, reviewer_id) VALUES($1, $2, $3, $4, $5, $6, $7)', [data.movie_name, data.review, data.rate, data.rank, data.publication, data.review_date, newCriticId])
    .then(() => {
      callback();
    })
    .catch((err) => callback(err));
};

const updateReview = async (id, data, callback) => {
  let query = ['UPDATE reviews SET'];
  Object.keys(data).forEach((key) => {
    // eslint-disable-next-line prefer-template
    query.push(`${key} = ${"'" + data[key] + "'"},`);
  });
  query.push(`WHERE id = ${id}`);
  query = query.join(' ').split('');
  query.splice(query.lastIndexOf(','), 1);
  query = query.join('');
  // await pool.connect();
  await pool.query(query)
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

const deleteReview = async (id, callback) => {
  // await pool.connect();
  await pool.query('DELETE FROM reviews WHERE id = $1', [id])
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  get100Reviews,
  getOneReview,
  postReview,
  updateReview,
  deleteReview,
};
