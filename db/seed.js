const db = require('.');
// eslint-disable-next-line camelcase
const dummy_data = require('./dummy-data.json');

for (let i = 0; i < 10; i++) {
  db.saveCReviews(dummy_data);
}
