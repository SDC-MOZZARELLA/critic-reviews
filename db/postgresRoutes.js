const { Pool } = require('pg')
const pool = new Pool({
  database: 'critic_reviews'
})



const get100Reviews = async (callback) => {
  await pool.connect();
  await pool.query('SELECT * FROM reviews inner join critic ON critic.id = reviews.reviewer_id WHERE reviews.id > 0 and reviews.id <= 100')
    .then(res => callback(null, res.rows))
    .catch(err => callback(err));
}

module.exports = {
  get100Reviews
}
// const connection = async () => {
//   await client.connect()
// const res = await client.query("SELECT * from mypostgrestable")
//   .then(() => )
// // console.log(res.rows)
// await client.end()
// }

// connection();