const faker = require('faker');
const Randomly = require('./randomGenerate.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'largeData.csv',
    header: [
        {id: 'user_name', title: 'user_name'},
        {id: 'user_photo', title: 'user_photo'}
        {id: 'user_page', title: 'user_page'}
        {id: 'movie_name', title: 'movie_name'}
        {id: 'review', title: 'review'}
        {id: 'rate', title: 'rate'}
        {id: 'rank', title: 'rank'}
        {id: 'publication', title: 'publication'}
    ]
});
let bigDataArray = [];
for (let i = 0; i < 100000, i += 1) {
bigDataArray.push({
  user_name: Randomly.RandomName(),
  user_photo: Randomly.RandomPhoto(),
  user_page: faker.internet.domainName(),
  movie_name: Randomly.RandomMovie(),
  review: faker.lorem.paragraph(),
  rate: Randomly.RandomRate(),
  rank: Randomly.RandomRank(),
  publication: Randomly.RandomPublication();
})
}



// const rvSchema = mongoose.Schema({
//   movie_name: String,
//   review: String,
//   rate: String,
//   rank: String,
//   publication: String,
//   date_post: String,
// });

// const crSchema = mongoose.Schema({
//   id: Number,
//   user_name: String,
//   user_photo: String,
//   user_page: String,
//   reviews: rvSchema,
// });