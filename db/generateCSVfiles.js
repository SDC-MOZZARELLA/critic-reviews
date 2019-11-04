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
      data = [Randomly.RandomMovie(), faker.lorem.paragraph(), Randomly.RandomRate(), Randomly.RandomRank(), Randomly.RandomPublication(), Randomly.RandomReviewerId()];
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
  headers: ['user_name', 'user_photo', 'user_page']
})
writer.pipe(fs.createWriteStream('criticData.csv'))

writeCriticsCSV(writer, data, () => {
  console.log('Critics CSV created!')
})

writer = csvWriter({
  headers: ['movie_name', 'review', 'rate', 'rank', 'publication', 'reviewer_id']
});

writer.pipe(fs.createWriteStream('reviewsData.csv'))

writeReviewsCSV(writer, data, () => {
  writer.end();
  console.log('Reviews CSV created!');
})
