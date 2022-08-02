const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { postSigninValidation, postSignupValidation } = require('../middlewares/validation');

router.post('/signin', postSigninValidation, login);
router.post('/signup', postSignupValidation, createUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена - 404'));
});

module.exports = router;
