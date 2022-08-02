const { celebrate, Joi } = require('celebrate');
const customUrlValidationJoi = require('../utils/customUrlValidationJoi');

module.exports.postSigninValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.postSignupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.patchUserEditionValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.postMovieAddValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().integer().required().min(1900),
    description: Joi.string().required(),
    image: Joi.string().required().custom(customUrlValidationJoi),
    trailerLink: Joi.string().required().custom(customUrlValidationJoi),
    thumbnail: Joi.string().required().custom(customUrlValidationJoi),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
});
