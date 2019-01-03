module.exports = function(app, db) {
  // app.get('/notes/:id', (req, res) => {
  app.get('/', (req, res) => {
    const id = req.params.id;
    // var ObjectId = require('mongodb').ObjectID;
    // const details = { '_id': ObjectId(id) };

    db.collection('notes').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {notes: result})
    });
    // db.collection('notes').findOne(details, (err, item) => {
    //   if(err) {
    //     res.send({'error': 'An error has occurred'});
    //   } else {
    //     res.send(item);
    //   }
    // });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    const details = { '_id': ObjectId(id) };
    db.collection('notes').remove(details, (err, item) => {
      if(err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send('Note ' +id + ' deleted!');
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    const details = { '_id': ObjectId(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
