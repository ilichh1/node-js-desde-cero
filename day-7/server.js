const express = require('express');
const app = express();

const { VALID_USERS } = require('./dummyData');
const { crearJwt, validarToken } = require('./jwt');

const port = 8080;

function authMiddleware(req, res, next) {
  const username = req.get('username');
  const password = req.get('password');

  const matchedUser = VALID_USERS.find(({ username: trueUsername }) => username === trueUsername);

  if (!matchedUser) {
    res.send({
      message: 'No hay usuario y/o contraseña'
    });
    return;
  }

  if (matchedUser.password !== password) {
    res.send({
      message: 'Contraseña incorrecta'
    });
    return;
  }

  next();
}

function logger(req, res, next) {
  const userAgent = req.get('User-Agent');
  const timestamp = Math.floor(Date.now() / 1000);
  console.log(`Un usuario usando ${userAgent} hizo una peticion al segundo ${timestamp}`);
  next();
}

const arreglo = [
  // authMiddleware,
  logger
];

app.use(arreglo);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/login', (req, res) => {
  const username = req.get('username');
  const password = req.get('password');

  const matchedUser = VALID_USERS.find(({ username: trueUsername }) => username === trueUsername);

  if (!matchedUser) {
    res.status(401).send({
      message: 'No hay usuario y/o contraseña'
    });
    return;
  }

  if (matchedUser.password !== password) {
    res.status(401).send({
      message: 'Contraseña incorrecta'
    });
    return;
  }

  crearJwt({ payload: { username } })
    .then(token => {
      res.send({
        message: 'Bienvenido',
        token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(422).send({
        error: {
          message: 'Algo salio muy mal'
        }
      });
    });
});

function jwtAuthMiddleware(req, res, next) {
  const tokenHeader = req.get('Authorization');

  if (!tokenHeader) {
    res.send({
      error: {
        message: 'No existe el token de autentificacion.'
      }
    });
    return;
  }

  validarToken(tokenHeader.replace('Bearer ', ''))
    .then(decodedToken => {
      console.log(decodedToken);
      console.log('hora acutal ', Math.floor(Date.now() / 1000));
      next();
    })
    .catch(error => {
      console.log(error);
      res.send({
        error: {
          message: 'Tu token es invalido',
        }
      });
    });
}

app.get('/usuarios', [jwtAuthMiddleware],(req, res) => {
  res.send({
    users: VALID_USERS.map(({username}) => ({username}))
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));