const mongoose = require('mongoose');
const Car = require('../../models/car');

function handleCarCreation(req, res) {
  const { car: carToCreate } = req.body;
  if (!carToCreate) {
    res
      .status(422)
      .send({
        error: { message: 'No se mandó un objeto válido.' }
      });
    return;
  }
  const { brand, year, plates, model } = carToCreate;
  const car = new Car({
    _id: mongoose.Types.ObjectId(),
    brand,
    year,
    plates,
    model
  });
  car
    .save()
    .then(result => {
      res.send({
        message: 'Carro creado exitosamente',
        result
      });
    })
    .catch(err => {
      res.status(422).send({
        error: {
          message: 'Algo salio mal',
          dbError: err
        }
      });
    });
}

function handleCarReading(req, res) {
  Car
    .find()
    .then(docs => {
      console.log('Result while searching all cars on DB', docs);
      res.status(200).jsonp(docs);
    })
    .catch(err => {
      console.log('Error while searching cars', err);
      res.status(500).json({
        error: err
      });
    });
}

function handleCarUpdating(req, res) {
  const { id = null } = req.params;
  const { car: newCar } = req.body;
  if (!id) {
    res
      .status(422)
      .send({
        error: {
          message: 'No se recibió ningún ID valido',
        }
      });
    return;
  }
  const updateOps = { ...newCar };
  delete updateOps['_id'];
  Car
    .updateOne({ _id: id }, { $set: updateOps })
    .then(dbResult => {
      if (dbResult.n === 0) {
        res.status(404).send({message: 'No hay un carro con ese ID.'});
        return;
      }
      console.log(dbResult);
      // Solo el resultado de la DB, sin el objeto modificado
      // res.status(200).json(result);
      Car.findById(id)
        .then(updatedCar => {
          res.send({
            message: 'Registro actualizado exitosamente',
            updatedCar
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

function handleCarDeletion(req, res) {
  const { id = null } = req.params;
  if (!id) {
    res
      .status(422)
      .send({
        error: {
          message: 'No se recibió ningún ID valido',
        }
      });
    return;
  }
  Car
    .findByIdAndRemove(id)
    .then(deletedCar => {
      // if (dbResult.n === 0) { // No estamos obteniendo un resultado de la DB
      //   res
      //     .status(402)
      //     .send({
      //       message: 'No hay un carro con ese ID.'
      //     });
      //   return;
      // }
      if (deletedCar === null) {
          res
            .status(402)
            .send({
              message: 'No hay un carro con ese ID.'
            });
          return;
      }
      res.send({
        deletedCar
      });
    })
    .catch(err => {
      res
        .status(500)
        .send({
          error: err
        });
    });
}

function handleSearchCarById(req, res) {
  const { id = null } = req.params;
  if (!id) {
    res
      .status(422)
      .send({
        error: {
          message: 'No se recibió ningún ID valido',
        }
      });
    return;
  }
  // Continuar con la operación normal
  Car
    .findById(id)
    .then(doc => {
      console.log("From DB", doc);
      if (!doc) {
        res
          .status(404)
          .json({
            error: { message: 'No se encontraron resultados' }
          });
        return;
      }
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

module.exports = {
  handleCarCreation,
  handleCarReading,
  handleCarUpdating,
  handleCarDeletion,
  handleSearchCarById,
}