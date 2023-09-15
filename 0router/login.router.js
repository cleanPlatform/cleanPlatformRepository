const express = require('express');
const router = express.Router();

const LoginController = require('../1controllers/login.controller');
const loginController = new LoginController();

const { authorized } = require('../middlewares/auth-middleware');

router.post('/signin', loginController.login);
router.get('/signout', authorized, loginController.logout);

module.exports = router;
