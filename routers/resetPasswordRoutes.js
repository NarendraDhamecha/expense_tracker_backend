const express = require('express');
const router = express.Router();
const resetPassword = require('../controllers/resetPasswordController');

router.post('/forgotpassword', resetPassword.forgotPassword);

module.exports = router;