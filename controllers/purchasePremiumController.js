const Razorpay = require("razorpay");
const Order = require("../models/premiumFeaturesModel");

exports.purchaseMembership = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = 4500;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(err);
      }

      Order.create({ orderId: order.id, status: "PENDING", userId: req.user._id })
        .then(() => res.status(201).json({ order, key_id: rzp.key_id }))
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    res.status(403).json({ message: "something went wrong", error: err });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  const { payment_id, order_id, status } = req.body;

  try {
    const order = await Order.findOne({ orderId: order_id });
    if (status === "failed") {
      order.paymentId = payment_id;
      order.status = "FAILED";
      await order.save();
      return res.json({ message: "Transaction Failed" });
    }

    order.paymentId = payment_id;
    order.status = "SUCCESSFUL";
    const promise1 = order.save();

    req.user.isPremium = true;
    const promise2 = req.user.save();

    Promise.all([promise1, promise2])
      .then(() => res.json({ message: "Transaction Successful" }))
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    res.status(402).json(err);
  }
};
