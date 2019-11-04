const faker = require('faker');
const Randomly = require('./randomGenerate.js');
const generateCritics = require('./criticsGenerate').generateCritics
const csvWriter = require('csv-write-stream');
const fs = require('fs');

let data;
let critics = [];
generateCritics(critics);

function writeCriticsCSV(writer, data, callback) {
  let i = critics.length - 1;
  write();
  function write() {
    let ok = true;
    do {
      data = critics[i];
      i -= 1;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

function writeReviewsCSV(writer, data, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      data = [Randomly.RandomMovie(),faker.lorem.paragraph(),Randomly.RandomRate(),Randomly.RandomRank(),Randomly.RandomPublication(), Randomly.RandomReviewerId()];
      i -= 1;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

let writer = csvWriter({
  headers: ['user_name', 'user_photo','user_page']
})
writer.pipe(fs.createWriteStream('criticData.csv'))

writeCriticsCSV(writer, data, () => {
  console.log('Critics CSV created!')
})


  writer = csvWriter({
  headers: ['movie_name','review','rate','rank','publication', 'reviewer_id']
});

writer.pipe(fs.createWriteStream('reviewsData.csv'))

writeReviewsCSV(writer, data, () => {
  writer.end();
  console.log('Reviews CSV created!')
})


// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//     path: 'largeData.csv',
//     header: [
//         {id: 'user_name', title: 'user_name'},
//         {id: 'user_photo', title: 'user_photo'},
//         {id: 'user_page', title: 'user_page'},
//         {id: 'movie_name', title: 'movie_name'},
//         {id: 'review', title: 'review'},
//         {id: 'rate', title: 'rate'},
//         {id: 'rank', title: 'rank'},
//         {id: 'publication', title: 'publication'}
//     ]
// });
// let bigDataArray0 = [];
// let bigDataArray1 = [];
// let bigDataArray2 = [];
// let bigDataArray3 = [];
// let bigDataArray4 = [];
// let bigDataArray5 = [];
// let bigDataArray6 = [];
// let bigDataArray7 = [];
// let bigDataArray8 = [];
// let bigDataArray9 = [];
// let bigDataArray10 = [];

// for (let i = 0; i < 100000; i += 1) {
// bigDataArray0.push({
//   user_name: Randomly.RandomName(),
//   user_photo: Randomly.RandomPhoto(),
//   user_page: faker.internet.domainName(),
//   movie_name: Randomly.RandomMovie(),
//   review: faker.lorem.paragraph(),
//   rate: Randomly.RandomRate(),
//   rank: Randomly.RandomRank(),
//   publication: Randomly.RandomPublication()
// })
// }
// for (let i = 0; i < 100000; i += 1) {
// bigDataArray1.push({
//   user_name: Randomly.RandomName(),
//   user_photo: Randomly.RandomPhoto(),
//   user_page: faker.internet.domainName(),
//   movie_name: Randomly.RandomMovie(),
//   review: faker.lorem.paragraph(),
//   rate: Randomly.RandomRate(),
//   rank: Randomly.RandomRank(),
//   publication: Randomly.RandomPublication()
// })
// }


// csvWriter.writeRecords(bigDataArray0)
//   .then(() => {csvWriter.writeRecords(bigDataArray1)})
//   .then(() => {csvWriter.writeRecords(bigDataArray2)})
//   .then(() => {csvWriter.writeRecords(bigDataArray3)})

//   .then(() => {console.log('done!')})
//   .catch((err) => {console.log(err)});


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