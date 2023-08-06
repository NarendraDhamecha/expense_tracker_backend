const User = require("../models/userAuthModel");

exports.showLeaderboard = async (req, res) => {
  try {
    const leaderboardData = await User.findAll({
      attributes: ["id", "name", "totalExpenses"],
      order: [["totalExpenses", "DESC"]],
    });

    res.json(leaderboardData);
  } catch (err) {
    res.status(500).json(err);
  }
};
