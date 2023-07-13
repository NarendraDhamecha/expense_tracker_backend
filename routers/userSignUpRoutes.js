const express = require('express');
const router = express.Router();
const userController = require('../controllers/userSignUpController');

router.post('/', userController.postUserCreds);

module.exports = router;