// Mongo
// db.getCReviews((err, results) => {
//   if (err) throw err;
//   res.send(results).end();
// });

// Mongo
// db.getCReviewsById(req.params.id, (err, doc) => {
//   if (err) {
//     res.sendStatus(404)
//   } else {
//     res.send(doc);
//   }
// })

// Mongo
// [data.user_name, data.user_photo, data.user_page]
// db.postNewReview(req.body)
// res.status(201).send('Review saved to database');

// Mongo
// db.updateReview(req.params.id, req.query, (err, doc) => {
//   if (err) {
//     res.status(400).send(`Could not update document at id:${req.params.id}`)
//   } else {
//     res.status(202).send(`Successfully updated document id:${req.params.id}`)
//   }
// })

// Mongo
// db.deleteReview(req.params.id, (err, doc) => {
//   if (err) {
//     res.send('Fail: Your request could not be processed.')
//   } else {
//     res.status(202).send("Document successfully deleted")
//   }
// })
