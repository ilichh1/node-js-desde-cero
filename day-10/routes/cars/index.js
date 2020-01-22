const express = require('express');
const carsRouter = express.Router();

const {
  handleCarCreation,
  handleCarReading,
  handleCarUpdating,
  handleCarDeletion,
  handleSearchCarById
} = require('./cars');

carsRouter.use((req, res, next) => {
  console.log('Ejecutando en el router de carros!');
  next();
});

carsRouter
  .route('/')
  .post(handleCarCreation)
  .get(handleCarReading);

carsRouter
  .route('/:id')
  .get(handleSearchCarById)
  .put(handleCarUpdating)
  .delete(handleCarDeletion);

module.exports = carsRouter;