const Razorpay = require("razorpay");
const Order = require("../models/premiumFeaturesModel");
const Expenses = require("../models/expensesModel");
const User = require("../models/userAuthModel");

exports.premiumFeatures = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: "rzp_test_buE7dGkucuP8Ax",
      key_secret: "n8hoNngezGRbUJhPn0Nc4HCQ",
    });

    const amount = 4500;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(err);
      }

      req.user
        .createOrder({ orderId: order.id, status: "PENDING" })
        .then(() => res.status(201).json({ order, key_id: rzp.key_id }))
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "something went wrong", error: err });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  const { payment_id, order_id, status } = req.body;

  try {
    const order = await Order.findOne({ where: { orderId: order_id } });
    if(status === 'failed'){
      await order.update({ paymentId: payment_id, status: "FAILED" });
      return res.json({message: "Transaction Failed"})
    }
    await order.update({ paymentId: payment_id, status: "SUCCESSFUL" });
    await req.user.update({ isPremium: true });
    res.json({message: "Transaction Successful"});
  } catch (err) {
    res.status(402).json(err);
  }
};

exports.showLeaderboard = async (req, res) => {
  const leaderboardData = [];
  let userMap = new Map();
  let expenseMap = new Map();
  let index = 0;
  try{ 
    const user = await User.findAll();

    for(let i of user){
      userMap.set(i.dataValues.id, i.dataValues.name)
    }

    const expenses = await Expenses.findAll();
    
    expenses.forEach((expense) => {
      if(expenseMap.has(expense.dataValues.userId)){
        
        leaderboardData[expenseMap.get(expense.dataValues.userId)].totalAmount += expense.dataValues.amount;
      }else{
        const data = {
          name: userMap.get(expense.dataValues.userId),
          totalAmount: expense.dataValues.amount,
          userId: expense.dataValues.userId
        }
        
        leaderboardData[index] = data;
        expenseMap.set(expense.dataValues.userId, index)
        index++
      }
    })
    res.json(leaderboardData);
  //  const expenses = await Expenses.findAll();
   
  //  for(let i of expenses){
  //   let totalAmount = 0;
  //    if(set.has(i.dataValues.userId)) continue;

  //    for(let j of expenses){
  //       if(i.dataValues.userId === j.dataValues.userId){
  //         totalAmount += j.dataValues.amount;
  //       }
  //    }

  //    leaderboardData.push({userId: i.dataValues.userId, totalAmount: totalAmount})
  //    set.add(i.dataValues.userId)
  //  }
  //  console.log(leaderboardData);
  }
  catch(err){
   console.log(err);
   res.status(400).json(err);
  }
}
