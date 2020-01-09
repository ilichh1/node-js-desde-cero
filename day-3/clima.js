const fetch = require('node-fetch');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '05c9e8199772f4bd6b85ffa20eee14f7';

function generarUrl(nombreCiudad, lang) {
  lang = !!lang ? lang : 'sp';
  // lang = ( (expresion logica) ? (SI ES TRUE) : (SI ES FALSE) )
  return `${API_URL}?q=${nombreCiudad}&lang=${lang}&appid=${API_KEY}`;
  // 'http://api.openweathermap.org/data/2.5/weather?q=Guadalajara&appid=05c9e8199772f4bd6b85ffa20eee14f7'
}

  // Consultando los datos de <ciudad 1>...
  // EN la <ciudad 1> hace <RESPONSE>
  // Consultando los datos de <ciudad 2>...
  // EN la <ciudad 2> hace <RESPONSE>
  // Consultando los datos de <ciudad 3>...
  // EN la <ciudad 3> hace <RESPONSE>

fetch(generarUrl('Guadalajara,MX'))
  .then(res => res.json())
  .then(({ name, weather, sys }) => {
    // DESTRUCTURANDO OBJETOS
    const [ pos1 ] = weather;
    const { description } = pos1;
    const { country } = sys;
    console.log(`En ${name}, ${country} hoy tenemos ${description}.`);
  });
  /**
   * SIN DESTRUCTURACIÓN
   */
  // .then(apiResponse => {
  //   // console.log(apiResponse);
  //   const cityName = apiResponse.name;
  //   const weatherDescription = apiResponse.weather[0].description;
  //   const countryCode = apiResponse.sys.country;
  //   console.log(`En ${cityName}, ${countryCode} hoy tenemos ${weatherDescription}.`);
  // });


const formatearYResolver = nombreCiudad => new Promise((resolve, reject) => {
  fetch(generarUrl(nombreCiudad))
  .then(res => res.json())
  .then(({ name, weather, sys }) => {
    // DESTRUCTURANDO OBJETOS
    const [ pos1 ] = weather;
    const { description } = pos1;
    const { country } = sys;
    resolve(`En ${name}, ${country} hoy tenemos ${description}.\n`);
  });
});


const arregloDePromesas = [
  formatearYResolver('Guadalajara,MX'),
  formatearYResolver('Zapopan'),
  formatearYResolver('Paris'),
  formatearYResolver('Barcelona'),
];

Promise.all(arregloDePromesas)
  .then(([ gdl, zap, paris, barc ]) => {
    console.log(gdl, zap, paris, barc);
  });