const Expenses = require("../models/expensesModel");
// const sequelize = require("../util/database");
// const AWS = require("aws-sdk");
// const DownloadedExpenses = require("../models/downloadedExpenses");

exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;
  // const t = await sequelize.transaction();
  try {
    const response = await Expenses.create(
      {
        amount,
        description,
        category,
        userId: req.user._id,
      }
      // { transaction: t }
    );

    req.user.totalExpenses = req.user.totalExpenses + amount;
    await req.user.save();
    // await req.user.update(
    //   { totalExpenses: req.user.totalExpenses + amount },
    //   // { transaction: t }
    // );

    // await t.commit();
    res.json(response);
  } catch (err) {
    // await t.rollback();
    res.status(500).json(err);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const page = Number(req.query.page);
    const rows = Number(req.query.rows);

    const totalCount = await Expenses.countDocuments({ userId: req.user._id });

    const response = await Expenses.find({ userId: req.user._id })
      .skip((page - 1) * rows)
      .limit(rows);

    res.json({
      response,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page * rows < totalCount,
      hasPreviousPage: page > 1,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id;
  const amount = Number(req.params.amount);
  // const t = await sequelize.transaction();

  try {
    const response = await Expenses.findOneAndDelete(
      { _id: id, userId: req.user._id }
      // transaction: t,
    );

    req.user.totalExpenses = req.user.totalExpenses - amount;
    await req.user.save();
    // await req.user.update(
    //   { totalExpenses: req.user.totalExpenses - amount },
    //   // { transaction: t }
    // );
    // t.commit();
    res.status(201).json(response);
  } catch (err) {
    // t.rollback();
    res.status(500).json(err);
  }
};

// exports.downloadExpenses = async (req, res) => {
//   try {
//     const expenses = await req.user.getExpenses();
//     const stringifiedExpenses = JSON.stringify(expenses);
//     const userId = req.user.id;
//     const filename = `Expenses${userId}/${new Date()}.txt`;
//     const fileURL = await uploadToS3(stringifiedExpenses, filename);
//     await DownloadedExpenses.create({ fileURL, userId });
//     res.json({ fileURL, message: "successfully downloaded" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// const uploadToS3 = (data, filename) => {
//   const s3bucket = new AWS.S3({
//     accessKeyId: process.env.IAM_USER_KEY,
//     secretAccessKey: process.env.IAM_USER_SECRET,
//   });

//   const params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: filename,
//     Body: data,
//     ACL: "public-read",
//   };

//   return new Promise((resolve, reject) => {
//     s3bucket.upload(params, (err, s3response) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(s3response.Location);
//       }
//     });
//   });
// };

// exports.getDownloadedExpenses = async (req, res) => {
//   try {
//     const response = await DownloadedExpenses.findAll({
//       where: { userId: req.user.id },
//       order: [["createdAt", "DESC"]],
//     });
//     res.json(response);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
