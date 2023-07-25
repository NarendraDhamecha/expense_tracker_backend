const Expenses = require("../models/expensesModel");
const User = require("../models/userAuthModel");
const sequelize = require('../util/database');


exports.showLeaderboard = async (req, res) => {
    try{ 
      const leaderboardData = await User.findAll({
        attributes: ['id', 'name', 'totalExpenses'],
        order: [['totalExpenses', 'DESC']]
      })
  
      res.json(leaderboardData);
    }
    catch(err){
     console.log(err);
     res.status(500).json(err);
    }
  }