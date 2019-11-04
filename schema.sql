DROP DATABASE IF EXISTS critic_reviews;

CREATE DATABASE critic_reviews;

\c critic_reviews;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS critic;


CREATE TABLE critic (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(60),
  user_photo VARCHAR(150),
  user_page VARCHAR(150)
);


CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  movie_name VARCHAR(60),
  review TEXT,
  rate DECIMAL,
  rank DECIMAL,
  publication VARCHAR(60),
  date_post VARCHAR(40),
  reviewer_id int DEFAULT NULL,
  FOREIGN KEY (reviewer_id) REFERENCES critic(ID)
);

/*
in the command line in the project root directory, psql -f schema.sql
*/