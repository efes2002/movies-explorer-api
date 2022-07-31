const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => Movie.findById(movie._id)
      .populate('owner')
      .then((item) => {
        if (!item) {
          next(new NotFoundError('Карточка не найдена'));
        } else {
          res.status(201).send(item);
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return next(new BadRequestError('Переданы некорректные данные'));
        }
        return next(err);
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Переданы некорректные данные - ${err.message}`));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id).then((movie) => {
    if (!movie) {
      next(new NotFoundError('Карточка не найдена'));
    } else if (movie.owner.toString() === req.user._id) {
      Movie.findByIdAndRemove(req.params.id)
        .then((item) => {
          if (!item) {
            next(new NotFoundError('Карточка не найдена'));
          } else {
            res.send(item);
          }
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError('Переданы некорректные данные'));
          }
          return next(err);
        });
    } else {
      next(new ForbiddenError('Карточка не принадлежит этому id'));
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};
