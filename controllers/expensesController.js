const Expenses = require("../models/expensesModel");
const sequelize = require("../util/database");

exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;
  const t = await sequelize.transaction();
  try {
    const response = await Expenses.create(
      {
        amount,
        description,
        category,
        userId: req.user.id,
      },
      { transaction: t }
    );

    await req.user.update(
      { totalExpenses: req.user.totalExpenses + amount },
      { transaction: t }
    );
    await t.commit();
    res.json(response);
  } catch (err) {
    console.log(err);
    await t.rollback();
    res.status(500).json(err);
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
  const amount = Number(req.params.amount);
  const t = await sequelize.transaction();

  try {
    const response = await Expenses.destroy({
      where: { id: id, userId: req.user.id },
      transaction: t
    });

    await req.user.update({totalExpenses: req.user.totalExpenses - amount}, {transaction: t})
    t.commit();
    res.status(201).json(response);

  } catch (err) {
    console.log(err);
    t.rollback()
    res.status(500).json(err);
  }
};
