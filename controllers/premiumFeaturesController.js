const User = require("../models/userAuthModel");

exports.showLeaderboard = async (req, res) => {
  try {
    const leaderboardData = await User.find()
      .select("id name totalExpenses")
      .sort({ totalExpenses: -1 });

    res.json(leaderboardData);
  } catch (err) {
    res.status(500).json(err);
  }
};
