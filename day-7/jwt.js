const jwt = require('jsonwebtoken');

const APP_SECRET = 'SECRETODEAMOR';

function crearJwt({ payload = {} }) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      APP_SECRET,
      { algorithm: 'HS256', expiresIn: '1 minute' },
      function(err, token) {
        if (err) reject(err);
        else resolve(token);
      });
  });
}

function validarToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, APP_SECRET, function(error, decodedToken) {
      if (error) reject(error);
      else resolve(decodedToken);
    });
  });
}

module.exports = {
  crearJwt,
  validarToken
};