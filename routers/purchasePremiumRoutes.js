const express = require("express");
const router = express.Router();
const purchasePremium = require("../controllers/purchasePremiumController");

router.get("/membership", purchasePremium.purchaseMembership);

router.post(
  "/updatetransactionstatus",
  purchasePremium.updateTransactionStatus
);

module.exports = router;
