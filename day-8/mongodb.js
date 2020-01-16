const MongoClient = require('mongodb').MongoClient
// Connection string
const url = 'mongodb://localhost:27017/';

// Database Name
const DB_NAME = 'test';

// Create a new MongoClient
const MONGO_CLIENT = new MongoClient(url, {
  useUnifiedTopology: true
});


module.exports = {
  connect: () => new Promise((resolve, reject) => {
    MONGO_CLIENT.connect(function(err, client) {
      if (err) reject(err);
      else resolve(client.db('test'));
    })
  })
};