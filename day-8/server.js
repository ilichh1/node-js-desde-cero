const express = require('express');
const bodyParser = require('body-parser');

const dbModule = require('./mongodb');

let database = null;

dbModule.connect()
  .then(db => database = db)
  .catch(console.error);

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.post('/objetos', (req, res) => {
  const { document: documentToInsert } = req.body;
  database.collection('inserts')
    .insertOne(documentToInsert,
      function(err, {ops}) {
        if (err) res.send(err);
        else res.send({
          message: 'Success!',
          insertedObject: ops[0]
        })
      });
});

app.get('/objetos', (req, res) => {

  database
    .collection('inserts')
    .find()
    .toArray()
    .then(result => {
      res.send({
        resultados: result
      });
    })
    .catch(() => {
      res.status(404).send({ message: 'Sin datos' })
    });
});

app.listen(PORT, () => console.log('App is up and running!'));