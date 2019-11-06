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
});

app.get('/api/cr_reviews/:id', (req, res) => {
  postgresRoutes.getOneReview(req.params.id, (err, doc) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(doc);
    }
  });
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
});

app.put('/api/cr_reviews/:id', (req, res) => {
  postgresRoutes.updateReview(req.params.id, req.body, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(202).send(`Successfully updated id: ${req.params.id}`);
    }
  });
});

app.delete('/api/cr_reviews/:id', (req, res) => {
  postgresRoutes.deleteReview(req.params.id, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(202).send(`Successfully removed id: ${req.params.id}`);
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(Date(), `Listening on: ${port}`);
});
