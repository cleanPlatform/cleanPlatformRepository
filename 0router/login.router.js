const express = require('express');
const router = express.Router();

const LoginController = require('../1controllers/login.controller');
const loginController = new LoginController();

const authMiddleware = require('../middlewares/auth-middleware');

router.post('/signin', loginController.loginController);
router.post('/signout', loginController.logoutController);

module.exports = router;
