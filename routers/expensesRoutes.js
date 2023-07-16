const express = require('express');
const router = express.Router();
const ExpensesController = require('../controllers/expensesController');

router.post('/addExpense', ExpensesController.addExpense);

router.get('/', ExpensesController.getExpenses);

router.delete('/:id', ExpensesController.deleteExpense);

module.exports = router;