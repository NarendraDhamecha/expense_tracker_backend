const express = require('express');
const router = express.Router();
const resetPassword = require('../controllers/resetPasswordController');

router.post('/forgotpassword', resetPassword.forgotPassword);

router.get('/resetpassword/:id', resetPassword.resetPassword);

router.get('/updatepassword/:id', resetPassword.updatePassword);

module.exports = router;