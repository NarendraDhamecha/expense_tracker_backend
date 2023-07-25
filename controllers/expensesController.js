const Expenses = require("../models/expensesModel");
const User = require('../models/userAuthModel');

exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    const response = await Expenses.create({
      amount,
      description,
      category,
      userId: req.user.id
    });

    await req.user.update({totalExpenses: req.user.totalExpenses + amount})

    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const response = await req.user.getExpenses();
    const data = [];

    for (let i of response) {
      data.push(i.dataValues);
    }

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id;

  try {
    await Expenses.destroy({ where: { id: id, userId: req.user.id } });
    res.status(200).json({message: 'success'});
  } catch (err) {
    console.log(err)
    res.status(404).json(err);
  }
};
