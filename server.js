const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

const port = 8000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  // dbCollection = database.db("notes-api");
  dbCollection = database.db("movies-api");

  require('./app/routes')(app, dbCollection);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
