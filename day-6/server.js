const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const APP_PORT = 8080;

let contadorDeVisitas = 0;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log(`Se hizo una petición desde el user agent ${req.headers['user-agent']}`);
  next();
});

function middlewareQueCuentaPeticiones(req, res, next) {
  contadorDeVisitas++;
  console.log(`Visitas totales ${contadorDeVisitas}`);
  next();
}

const matarDespuesDeCiertasVisitas = numeroPermitido => (req, res, next) => {
  if (contadorDeVisitas >= numeroPermitido) {
    res.send(401, {
      message: 'Limite superado'
    });
    return;
  }
  next();
}

app.use(middlewareQueCuentaPeticiones);

app.get('/permitir5', matarDespuesDeCiertasVisitas(5), (req, res) => res.send({ message: 'Bienvenido al servicio de 5.' }));

app.get('/permitir3', matarDespuesDeCiertasVisitas(3), (req, res) => res.send({ message: 'Bienvenido al servicio de 3.' }));

app.get('/visitas', function (req, res) {
  res.send({ message: 'Bienvenido' });
});

app.get('/', function(req, res) {
  res.send('Hola mundo');
});

app.get('/health', function(req, res) {
  res.send({
    message: 'Estoy saludable'
  });
});

app.get('/image', (req, res) => {
  const { key = null } = req.query;
  // console.log(req.get('key'));
  const finalKey = key || req.get('API_KEY');
  if (finalKey !== 'contraseña') {
    res.send({
      message: 'No tienes acceso a esta imagen'
    });
  }

  const options = {
    root: __dirname
  };
  console.log(__dirname);
  res.sendFile('imagen.jpeg', options);
});

app.listen(APP_PORT);
