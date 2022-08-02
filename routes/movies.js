const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { postMovieAddValidation, deleteMovieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', postMovieAddValidation, createMovie);
router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;
