const express = require('express')
const app = express()
const port = 3000

const ilich = { nombre: 'Ilich' };
const carlos = { nombre: 'Carlos' };
const alhondra = { nombre: 'Alhondra' };

app.get('/carlos', (req, res) => res.send(JSON.stringify(carlos)))

app.get('/ilich', (req, res) => res.send(JSON.stringify(ilich)))

app.get('/alhondra', (req, res) => res.send(JSON.stringify(alhondra)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))