const fetch = require('node-fetch');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '05c9e8199772f4bd6b85ffa20eee14f7';

function generarUrl(nombreCiudad) {
  return `${API_URL}?q=${nombreCiudad}&appid=${API_KEY}`;
}

fetch(generarUrl('Guadalajara'))
  .then(res => res.json())
  .then(apiResponse => console.log(apiResponse));