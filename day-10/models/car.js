const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand:  String,
  year: String,
  plates: {
    type: String,
    unique: true
  },
  model: String,
});

const CarModel = mongoose.model('Car', carSchema);

module.exports = CarModel;