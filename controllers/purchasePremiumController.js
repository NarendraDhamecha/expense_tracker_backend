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

      req.user
        .createOrder({ orderId: order.id, status: "PENDING" })
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
    const order = await Order.findOne({ where: { orderId: order_id } });
    if (status === "failed") {
      await order.update({ paymentId: payment_id, status: "FAILED" });
      return res.json({ message: "Transaction Failed" });
    }
    const promise1 = order.update({
      paymentId: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.update({ isPremium: true });
    Promise.all([promise1, promise2])
      .then(() => res.json({ message: "Transaction Successful" }))
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    res.status(402).json(err);
  }
};
