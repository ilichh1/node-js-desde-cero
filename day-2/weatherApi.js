const fetch = require('node-fetch');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '05c9e8199772f4bd6b85ffa20eee14f7';

/**
 * 
 * @param {*} params The city name or the { city: string, countryCode: string } object
 */
const generateWeatherEndpointByCity = (params) => {
  const apiLang = 'es';
  if (typeof params === 'string') {
    return `${API_URL}?q=${params}&lang=${apiLang}&appid=${API_KEY}`;
  }
  const { city, countryCode } = params;
  if (!city || !countryCode) {
    throw 'No se puede generar un endpoint con los parametros otorgados: ' + params;
  }
  return `${API_URL}?q=${city},${countryCode}&appid=${API_KEY}`;
};

const querys = [
  'Paris',
  'Guadalajara',
  {
    city: 'Guadalajara',
    countryCode: 'MX'
  }
];

function fetchAndProcessWeatherApi(queryValue) {
  const urlToBeFetched = generateWeatherEndpointByCity(queryValue);
  const cityName = queryValue.city || queryValue;
  return new Promise(resolve => {
    console.log(`Obteniendo clima de ${cityName}...`);
    return fetch(urlToBeFetched)
    .then(res => res.json())
    .then(({ weather, name: cityName, sys }) => {
      const { country: countryCode } = sys;
      const [ weatherObject ] = weather;
      console.log(`Clima de ${cityName} obtenido exitosamente.`);
      resolve({
        cityName,
        countryCode,
        ...weatherObject
      });
    })
    .catch(e => console.log(`No se pudieron obtener datos de ${cityName}`));
  });
}

const customResultsToString =
  ({ cityName: city, countryCode: country, description: desc }) =>
  `En ${city}, ${country}, hay ${desc}`;

Promise.all(querys.map(q => fetchAndProcessWeatherApi(q)))
  .then(results => {
    console.log('==========');
    results.forEach(r => console.log(customResultsToString(r)));
  });