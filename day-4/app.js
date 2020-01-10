// Official web page for express: https://expressjs.com
const express = require('express');
// Documentation about body parser: https://github.com/expressjs/body-parser#readme
const bodyParser = require('body-parser');

const APP_PORT = 8080;

const app = express();

// Objeto en memoria
const inMemoryObject = {
  array: [ 'first' ]
};

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Controller registration for the <root> endpoint ('/')
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
});

// Controller registration for the GET </push> endpoint
app.get('/push', (req, res) => {
  const { query } = req;
  inMemoryObject.array = [
    ...inMemoryObject.array,
    ...query.values.split(',')
  ];
  res.send({ msg: 'Success' });
});

// Controller registration for the POST </get> endpoint
app.get('/get', (req, res) => {
  res.send({ storedValues: inMemoryObject.array });
});

app.listen(APP_PORT, () => console.log(`Escuchando en el puesto ${APP_PORT}!`));