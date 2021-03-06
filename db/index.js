
const mongoose = require('mongoose');
const Randomly = require('./randomGenerate');
const autoIncrement = require('mongoose-auto-increment');
const mongodbUrl = 'mongodb://localhost:27017/cr_database';
var connection = mongoose.createConnection(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

autoIncrement.initialize(connection);
// const db = mongoose.connection;

// // eslint-disable-next-line no-console
// db.on('error', console.error.bind(console, 'connection err'));
// db.once('open', () => {
//   autoIncrement.initialize(db);
//   'Connection succeeded.';
// });

const rvSchema = mongoose.Schema({
  movie_name: String,
  review: String,
  rate: String,
  rank: String,
  publication: String,
  date_post: String,
});

const crSchema = mongoose.Schema({
  id: Number,
  user_name: String,
  user_photo: String,
  user_page: String,
  reviews: rvSchema,
});

crSchema.plugin(autoIncrement.plugin, 'CReview')

const CReviews = connection.model('CReviews', rvSchema);
const CReview = connection.model('CReview', crSchema);


let documentArray = [];
let idIndex = 100;
const saveCReviews = ((creviews) => {
  creviews.forEach((review) => {
    const data = review.reviews.date_post || Randomly.RandomDate();
    const name = review.user_name || Randomly.RandomName();
    const rate = review.reviews.rate || Randomly.RandomRate();
    const movie = review.reviews.movie_name || Randomly.RandomMovie();
    const rank = review.reviews.rank || Randomly.RandomRank();
    const photo = review.user_photo || Randomly.RandomPhoto();
    const publication = review.reviews.publication || Randomly.RandomPublication();

    const crReviews = new CReviews({
      movie_name: movie,
      review: review.reviews.review,
      rate,
      rank,
      publication,
      date_post: data,
    });

    const crReview = new CReview({
      user_name: name,
      user_photo: photo,
      user_page: review.user_page,
      reviews: crReviews,
    });

    documentArray.push(crReview);
    idIndex++;
  });
});

const seedDB = (arr, callback) => {
  CReview.insertMany(arr, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${arr.length} documents seeded.`)
      callback()
    }
  })
}

const getCReviews = (callback) => {
  CReview.find({})
    .sort({ 'CReview.reviews.date_post': -1 })
    .exec((err, results) => {
      if (err) callback(err, null);
      callback(null, results);
    });
};


const getCReviewsById = (id, callback) => {
  CReview.find({_id: id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc)
    }
  })
}

const postNewReview = (data) => {
    saveCReviews([data]);
}

const updateReview = (id, query, callback) => {
  CReview.findOneAndUpdate({_id: id}, query, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

const deleteReview = (id, callback) => {
  CReview.remove({_id: id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

module.exports = {
  documentArray,
  seedDB,
  CReview,
  saveCReviews,
  getCReviews,
  getCReviewsById,
  postNewReview,
  deleteReview,
  updateReview
};
