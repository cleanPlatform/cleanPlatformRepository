const express = require('express');
const router = express.Router();

const UsersController = require('../1controllers/user.controller');
const usersController = new UsersController();

const { authorized } = require('../middlewares/auth-middleware');

router.post('/signup', usersController.signupController);
router.put('/me', authorized, usersController.updateUserController);
router.get('/me', authorized, usersController.referUserController);
router.delete('/me', authorized, usersController.deleteAccoountController);

module.exports = router;
