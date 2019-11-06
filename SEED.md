# Setup instructions for starting project and seeding database

### Install all required packages
In the command line, run:
> npm install

### Create the Database and Tables

In the command line in the project root directory, run the following:
> psql -f schema.sql

### Create the CSV files

Next, we will have to generate the csv files that we will use to upload our data to our database. This will take several minutes to complete. In the command line in the project root directory, run the following command:
> npm run generate

### Seed the csv files to the database

For the next command, you will need the path to the newly created criticData.csv file from the last step.  Run the following command, inserting the correct path on your machine:
> psql -d critic_reviews -c "\copy critic(user_name, user_photo, user_page) FROM '{YOUR PATH}/criticData.csv' WITH CSV";

After the previous step is completed, we will do the same for the reviews csv file.  This has 10 million records, it make take a few minutes. Run the following command:

> psql -d critic_reviews -c "\copy reviews(movie_name, review, rate, rank, publication, review_date, reviewer_id) FROM '{YOUR PATH}/reviewsData.csv' WITH CSV";

Michaels-MacBook-Pro:CRITIC_REVIEWS michaelscanza$ psql -d critic_reviews -c "\copy critic(user_name, user_photo, user_page) FROM '/Users/michaelscanza/hrr41/CRITIC_REVIEWS/criticData.csv' WITH CSV";
COPY 169
Michaels-MacBook-Pro:CRITIC_REVIEWS michaelscanza$ psql -d critic_reviews -c "\copy reviews(movie_name, review, rate, rank, publication, review_date, reviewer_id) FROM '/Users/michaelscanza/hrr41/CRITIC_REVIEWS/reviewsData.csv' WITH CSV;
