const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;

console.log('Haciendo petición...');
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(json => {
    console.log(json.map(({ title: variable }) => variable));
    // console.log(json);
    console.log('Listo');
  });