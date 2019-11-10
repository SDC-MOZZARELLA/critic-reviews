// eslint-disable-next-line no-unused-vars
const nr = require('newrelic');

const RedisServer = require('redis-server');

const redis = require('redis');

const express = require('express');

const cors = require('cors');

// const db = require('../db'); comment

const postgresRoutes = require('../db/postgresRoutes.js');

const app = express();
const port = process.env.PORT || 4540;
const server = new RedisServer(6379);
server.open((err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log('Could not connect Redis server');
  }
});

const client = redis.createClient();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

app.get('/api/cr_reviews/', (req, res) => {
  client.get('getAll', (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      res.status(200).send(resultJSON);
    } else {
      postgresRoutes.get100Reviews((err2, docs) => {
        if (err2) {
          res.sendStatus(400);
        } else {
          client.set('getAll', JSON.stringify(docs), 'EX', 3600);
          res.send(docs);
        }
      });
    }
  });
});

app.get('/api/cr_reviews/:id', (req, res) => {
  client.get(req.params.id, (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      res.status(200).send(resultJSON);
    } else {
      postgresRoutes.getOneReview(req.params.id, (err2, doc) => {
        if (err2) {
          res.sendStatus(404);
        } else {
          client.set(req.params.id, JSON.stringify(doc), 'EX', 3600);
          res.send(doc);
        }
      });
    }
  })

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
