const Razorpay = require("razorpay");
const Order = require("../models/premiumFeaturesModel");

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
