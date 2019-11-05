const faker = require('faker');
const Randomly = require('./randomGenerate.js');
const generateCritics = require('./criticsGenerate').generateCritics
const csvWriter = require('csv-write-stream');
const fs = require('fs');

let data;
let critics = [];
generateCritics(critics);

function writeCriticsCSV(writer, data, callback) {
  let i = critics.length;
  write();
  function write() {
    let ok = true;
    do {
      i -= 1;
      data = critics[i];
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
  let i = 100;
  write();
  function write() {
    let ok = true;
    do {
      data = [Randomly.RandomMovie(), faker.lorem.paragraph(), Randomly.RandomRate(), Randomly.RandomRank(), Randomly.RandomPublication(), faker.date.between('1965-01-01', '2019-11-4'),Randomly.RandomReviewerId()];
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
  headers: ['user_name', 'user_photo', 'user_page'],
  sendHeaders: false
})
writer.pipe(fs.createWriteStream('criticData.csv'))

writeCriticsCSV(writer, data, () => {
  console.log('Critics CSV created!')
})

writer = csvWriter({
  headers: ['movie_name', 'review', 'rate', 'rank', 'publication', 'review_date','reviewer_id'],
  sendHeaders: false
});

writer.pipe(fs.createWriteStream('reviewsData.csv'))

writeReviewsCSV(writer, data, () => {
  writer.end();
  console.log('Reviews CSV created!');
})
