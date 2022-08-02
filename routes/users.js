const router = require('express').Router();
const {
  getUserMe,
  updateProfile,
} = require('../controllers/users');
const { patchUserEditionValidation } = require('../middlewares/validation');

router.get('/me', getUserMe);
router.patch('/me', patchUserEditionValidation, updateProfile);

module.exports = router;
