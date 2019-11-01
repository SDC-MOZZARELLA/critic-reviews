const db = require('.');
// eslint-disable-next-line camelcase

//pushes into documentArray
const dummy_data = require('./dummy-data.json');
for (let i = 0; i < 8000; i++) {
  db.saveCReviews(dummy_data);
}
db.seedDB(db.documentArray, () => {
  for (let i = 0; i < 8000; i++) {
    db.saveCReviews(dummy_data);
  }
  db.seedDB(db.documentArray, () => {
    console.log('done!')
  })
})

