const express = require('express');
const router = express.Router();

const AuthController = require('../1controllers/auth.controller');
const authController = new AuthController();

router.post('/signin', authController.signin);
router.get('/signout', authController.signout);

// router.post('/logout', isLoggedIn, logoutController);

module.exports = router;
