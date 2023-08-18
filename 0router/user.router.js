const express = require('express');
const router = express.Router();

const UsersController = require('../1controllers/user.controller');
const usersController = new UsersController();

// const authMiddleware = require('../middlewares/');

router.post('/signup', usersController.signup);
// router.get('/me', usersController.referUser);
router.put('/me', usersController.updateUser);
// router.post('/signIn', usersController.login);

module.exports = router;
