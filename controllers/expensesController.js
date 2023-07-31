const Expenses = require("../models/expensesModel");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");
const DownloadedExpenses = require('../models/downloadedExpenses')

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
      transaction: t,
    });

    await req.user.update(
      { totalExpenses: req.user.totalExpenses - amount },
      { transaction: t }
    );
    t.commit();
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    t.rollback();
    res.status(500).json(err);
  }
};

exports.downloadExpenses = async (req, res) => {
  try {
    const expenses = await req.user.getExpenses();
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const filename = `Expenses${userId}/${new Date()}.txt`;
    const fileURL = await uploadToS3(stringifiedExpenses, filename);
    await DownloadedExpenses.create({fileURL, userId})
    res.json({ fileURL, message: "successfully downloaded" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const uploadToS3 = (data, filename) => {
  const s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        reject(err);
      } else {
        resolve(s3response.Location);
      }
    });
  });
};

exports.getDownloadedExpenses = async (req, res) => {
  try{
    const response = await DownloadedExpenses.findAll({where: {userId: req.user.id}})
    res.json(response)
  }
  catch(err){
    res.status(500).json(err);
  }
}
