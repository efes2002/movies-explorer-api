const mongoose = require('mongoose');
const customUrlValidationMongoose = require('../utils/customUrlValidationMongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: { validator: customUrlValidationMongoose },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: customUrlValidationMongoose },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: customUrlValidationMongoose },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
