const largeDataUsers0 = require('../largeDataUsers0.json');
const largeDataUsers1 = require('../largeDataUsers1.json');
const largeDataUsers2 = require('../largeDataUsers2.json');
const largeDataUsers3 = require('../largeDataUsers3.json');
const largeDataUsers4 = require('../largeDataUsers4.json');
const largeDataUsers5 = require('../largeDataUsers5.json');
const largeDataUsers6 = require('../largeDataUsers6.json');
const largeDataUsers7 = require('../largeDataUsers7.json');
const largeDataUsers8 = require('../largeDataUsers8.json');
const largeDataUsers9 = require('../largeDataUsers9.json');
const { Client } = require('pg')
const client = new Client({
  database: 'critic_reviews'
})
 client.connect();
// console.log(res.rows)

  for (let i = 0; i < largeDataUsers0.length; i += 1) {
    client.query(`INSERT INTO critic(user_name, user_photo, user_page) VALUES($1, $2, $3)`,[largeDataUsers0[i].user_name, largeDataUsers0[i].user_photo, largeDataUsers0[i].user_page])
  }
  for (let i = 0; i < largeDataUsers1.length; i += 1) {
    client.query(`INSERT INTO critic(user_name, user_photo, user_page) VALUES($1, $2, $3)`,[largeDataUsers1[i].user_name, largeDataUsers1[i].user_photo, largeDataUsers1[i].user_page])
  }
  for (let i = 0; i < largeDataUsers2.length; i += 1) {
    client.query(`INSERT INTO critic(user_name, user_photo, user_page) VALUES($1, $2, $3)`,[largeDataUsers2[i].user_name, largeDataUsers2[i].user_photo, largeDataUsers2[i].user_page])
  }
  for (let i = 0; i < largeDataUsers3.length; i += 1) {
    client.query(`INSERT INTO critic(user_name, user_photo, user_page) VALUES($1, $2, $3)`,[largeDataUsers3[i].user_name, largeDataUsers3[i].user_photo, largeDataUsers3[i].user_page])
  }




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

