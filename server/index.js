const express = require('express');

const cors = require('cors');

// const db = require('../db');

const app = express();
const postgresRoutes = require('../db/postgresRoutes.js');

const port = process.env.PORT || 4540;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

app.get('/api/cr_reviews/', (req, res) => {
  postgresRoutes.get100Reviews((err, docs) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(docs);
    }
  });
  // Mongo
  // db.getCReviews((err, results) => {
  //   if (err) throw err;
  //   res.send(results).end();
  // });
});

app.get('/api/cr_reviews/:id', (req, res) => {
  postgresRoutes.getOneReview(req.params.id, (err, doc) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(doc);
    }
  });
  // Mongo
  // db.getCReviewsById(req.params.id, (err, doc) => {
  //   if (err) {
  //     res.sendStatus(404)
  //   } else {
  //     res.send(doc);
  //   }
  // })
});

app.post('/api/cr_reviews/', (req, res) => {
  const { body } = req;
  postgresRoutes.postReview(body, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send('Thank you for your review!');
    }
  });
  // Mongo
  // [data.user_name, data.user_photo, data.user_page]
  // db.postNewReview(req.body)
  // res.status(201).send('Review saved to database');
});

app.put('/api/cr_reviews/:id', (req, res) => {
  postgresRoutes.updateReview(req.params.id, req.body, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(202).send(`Successfully updated id: ${req.params.id}`);
    }
  });

  // Mongo
  // db.updateReview(req.params.id, req.query, (err, doc) => {
  //   if (err) {
  //     res.status(400).send(`Could not update document at id:${req.params.id}`)
  //   } else {
  //     res.status(202).send(`Successfully updated document id:${req.params.id}`)
  //   }
  // })
});

app.delete('/api/cr_reviews/:id', (req, res) => {
  postgresRoutes.deleteReview(req.params.id, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(202).send(`Successfully removed id: ${req.params.id}`);
    }
  });

  // Mongo
  // db.deleteReview(req.params.id, (err, doc) => {
  //   if (err) {
  //     res.send('Fail: Your request could not be processed.')
  //   } else {
  //     res.status(202).send("Document successfully deleted")
  //   }
  // })
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(Date(), `Listening on: ${port}`);
});
