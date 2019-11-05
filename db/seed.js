const path = require('path')
const { Client } = require('pg')
const client = new Client({
  database: 'critic_reviews'
})
 client.connect();
// console.log(res.rows)
console.log(path.join(__dirname, '../criticData.csv'))
client.query("COPY critic FROM '../criticData.csv' DELIMITER ',' CSV HEADER")


// CREATE TABLE critic (
//   id SERIAL PRIMARY KEY,
//   user_name VARCHAR(60),
//   user_photo VARCHAR(150),
//   user_page VARCHAR(150)
// );














//old seed here
// const db = require('.');
// // eslint-disable-next-line camelcase

// //pushes into documentArray
// const dummy_data = require('./dummy-data.json');
// for (let i = 0; i < 8000; i++) {
//   db.saveCReviews(dummy_data);
// }
// db.seedDB(db.documentArray, () => {
//   for (let i = 0; i < 8000; i++) {
//     db.saveCReviews(dummy_data);
//   }
//   db.seedDB(db.documentArray, () => {
//     console.log('done!');
//   })
// })

