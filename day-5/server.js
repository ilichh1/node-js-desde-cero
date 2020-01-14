const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const carros = [
  {
    id: 55,
    made: 'Subaru'
  },
  {
    id: 56,
    made: 'Chevy'
  },
  {
    id: 57,
    made: 'Toyota',
    model: 'Corolla'
  }
];

app.use(bodyParser.json());

app.get('/pruebas', (req, res) => {
  console.log(req.headers);
  res.send();
});

app.get('/consultar', (req, res) => {
  const { id: idToFind } = req.query;
  console.log('el usuario quiere buscar ', idToFind);
  if (!!idToFind) {
    const carroEncontrado = carros.find(({ id }) => id == idToFind);
    console.log(carroEncontrado);
    if (!carroEncontrado) {
      res.send({
        msg: 'No hay carros con el id: ' + idToFind
      });
      return;
    }
    res.send({
      msg: 'Tiene un resultado',
      carroEncontrado
    });
    return;
  }
  res.send({
    msg: 'has consultado informacion',
    carros
  });
});

app.get('/consultar/:id', (req, res) => {
  const carroToUpdate = carros.find(({ id }) => id == req.params.id);
  res.send({
    msg: 'has consultado informacion',
    carroToUpdate
  });
});

app.post('/guardar', (req, res) => {
  carros.push(req.body);
  res.send({
    msg: 'Has guardado informacions',
    savedId: req.body.id
  });
});

app.put('/actualizar/:idCarro', (req, res) => {
  const carroToUpdate = carros.find(({ id }) => id == req.params.idCarro);
  const indexToUpdate = carros.indexOf(carroToUpdate);
  console.log(carroToUpdate);
  carros[indexToUpdate] = {
    ...carros[indexToUpdate],
    ...req.body
  };
  res.send({
    msg: 'Has actualizados informacions',
    carroActualizado: carros[indexToUpdate]
  });
});

app.delete('/borrar/:idCarro', (req, res) => {
  const carroToUpdate = carros.find(({ id }) => id == req.params.idCarro);
  const indexToUpdate = carros.indexOf(carroToUpdate);
  delete carros[indexToUpdate];
  res.status(204);
  res.send();
});

function buscador(arregloABuscar, parametrosABuscar) {
  return arregloABuscar.filter(carro => {
    return Object
      .keys(parametrosABuscar)
      .map(key => !!carro[key])
      .includes(true);
  });
}

app.get('/buscar', (req, res) => {
  const { query: params } = req;
  console.log(params);
  const resultadoDeBusqueda = buscador(carros, params);
  res.send({
    resultCount: resultadoDeBusqueda.length,
    results: resultadoDeBusqueda
  });
});

app.listen(8080, () => console.log('El servidor esta vivo'));