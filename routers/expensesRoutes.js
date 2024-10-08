const express = require("express");
const router = express.Router();
const ExpensesController = require("../controllers/expensesController");

router.post("/addExpense", ExpensesController.addExpense);

router.get("/", ExpensesController.getExpenses);

router.delete("/:id/:amount", ExpensesController.deleteExpense);

// router.get("/download", ExpensesController.downloadExpenses);

// router.get("/olddownloaded", ExpensesController.getDownloadedExpenses);

module.exports = router;
