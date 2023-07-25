const express = require('express');
const router = express.Router();
const premiumFeatures = require('../controllers/premiumFeaturesController');

router.get('/showleaderboard', premiumFeatures.showLeaderboard);

module.exports = router;