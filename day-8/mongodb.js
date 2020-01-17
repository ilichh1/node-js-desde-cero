// Documentacion: http://mongodb.github.io/node-mongodb-native/3.5/api/index.html

const MongoClient = require('mongodb').MongoClient
// Connection string
const url = 'mongodb://localhost:27017';

// Create a new MongoClient
const MONGO_CLIENT = new MongoClient(url, {
  useUnifiedTopology: true
});

// MONGO_CLIENT.connect(function(err, client) {
//   const testDb = client.db('test');
//   testDb
//   .collection('test.perros').find().toArray()
//   .then(arregloDePerros => console.log(arregloDePerros));
// });

module.exports = {
  connect: () => new Promise((resolve, reject) => {
    MONGO_CLIENT.connect(function(err, client) {
      if (err) reject(err);
      else resolve(client.db('test'));
    })
  })
};