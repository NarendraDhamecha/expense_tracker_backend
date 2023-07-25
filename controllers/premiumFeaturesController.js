const Expenses = require("../models/expensesModel");
const User = require("../models/userAuthModel");
const sequelize = require('../util/database');


exports.showLeaderboard = async (req, res) => {
    try{ 
      const leaderboardData = await User.findAll({
        attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')),'totalAmount']],
        include: [
          {
            model: Expenses,
            attributes: []
          }
        ],
        group: ['user.id'],
        order: [['totalAmount', 'DESC']]
      });
  
      res.json(leaderboardData);
    }
    catch(err){
     console.log(err);
     res.status(500).json(err);
    }
  }