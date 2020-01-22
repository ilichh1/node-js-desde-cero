const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const APP_PORT = process.env.PORT;
const app = express();
const carsRouter = require('./routes/cars');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use('/cars', carsRouter);

app.all('/', (req, res) => {
  res.json({
    message: 'Todo OK.',
    timestamp: Date.now(),
  });
});

app.use((req, res, next) => {
  const error = {
    message: 'Request to a non-existent route.',
    status: 404,
  };
  next(error);
});

app.use((error, req, res, next) => {
  res
  .status(error.status || 500)
  .json({
    error
  });
});

app.listen(APP_PORT, () => console.log('El servidor arrancó exitosamente.'));