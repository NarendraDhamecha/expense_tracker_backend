const express = require('express');
const router = express.Router();
const premiumFeaturesController = require('../controllers/premiumFeaturesController');

router.get('/premiummembership', premiumFeaturesController.premiumFeatures);

router.post('/updatetransactionstatus', premiumFeaturesController.updateTransactionStatus)

module.exports = router