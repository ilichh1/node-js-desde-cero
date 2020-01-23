const express = require('express');

const app = express();
const PORT = 80;

app.all('/', (req, res) => res.send({ message: 'Everything is ok!' }));

app.listen(PORT, () => console.log('This app is alive!'));