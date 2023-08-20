const express = require('express');
const router = express.Router();

const UsersController = require('../1controllers/user.controller');
const usersController = new UsersController();

const authMiddleware = require('../middlewares/auth-middleware');

router.post('/signup', usersController.signup_controller);
router.post('/signIn', usersController.login_controller);
router.get('/me', usersController.referUser_controller);
router.put('/me', usersController.updateUser_controller);
router.delete('/resign', usersController.resignUser_controller);

module.exports = router;
