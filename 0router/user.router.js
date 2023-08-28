const express = require('express');
const router = express.Router();

const UsersController = require('../1controllers/user.controller');
const usersController = new UsersController();

const authMiddleware = require('../middlewares/auth-middleware');

router.post('/signup', usersController.signupController);
router.put('/me', usersController.updateUserController);
router.get('/me', usersController.referUserController);
router.delete('/resign', usersController.deleteAccountController);

module.exports = router;
