const express = require('express');
const router = express.Router();
const userController = require('../controllers/userAuthController');

router.post('/signup', userController.userSignUp);

router.post('/login', userController.userLogIn)

module.exports = router;