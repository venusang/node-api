module.exports = function(app, db) {
  app.get('/', (req, res) => {
    const id = req.params.id;

    db.collection('movies').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {movies: result})
    });
  });

  app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    const details = { '_id': ObjectId(id) };
    db.collection('movies').remove(details, (err, item) => {
      if(err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send('Movie ' +id + ' deleted!');
      }
    });
  });

  app.put('/movies/:id', (req, res) => {
    const id = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    const details = { '_id': ObjectId(id) };
    const movie = { title: req.body.title, format: req.body.format, length: req.body.length, release: req.body.release, rating: req.body.rating};
    db.collection('movies').update(details, movie, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(movie);
      }
    });
  });

  app.post('/movies', (req, res) => {
    const movie = { title: req.body.title, format: req.body.format, length: req.body.length, release: req.body.release, rating: req.body.rating };
    db.collection('movies').insert(movie, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
