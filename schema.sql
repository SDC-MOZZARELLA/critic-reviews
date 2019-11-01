DROP DATABASE IF EXISTS critic_reviews;

CREATE DATABASE critic_reviews;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  movie_name VARCHAR(60),
  review TEXT,
  rate DECIMAL,
  rank DECIMAL,
  publication VARCHAR(60),
  date_post VARCHAR(40),
  PRIMARY KEY (ID)
);

CREATE TABLE critic (
  id int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(60),
  user_photo VARCHAR(150),
  user_page VARCHAR(150),
  review_id int DEFAULT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (review_id) REFERENCES reviews(ID)
);


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