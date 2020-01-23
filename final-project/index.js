const express = require('express');

const app = express();
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8000;
}

app.all('/', (req, res) => res.send({ message: 'Everything is ok!' }));

app.listen(PORT, () => console.log('This app is alive!'));