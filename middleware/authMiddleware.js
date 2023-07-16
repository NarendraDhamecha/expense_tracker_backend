const jwt = require('jsonwebtoken');
const User = require('../models/userAuthModel')

const Authorization = async (req, res, next) => {
  const token = req.header('Authorization');
  const userId = jwt.verify(token, 'NEOemuhE86WuAWQM3BTI5BZ36l9nETfW');

  try{
    const user = await User.findByPk(userId.userId);
    req.user = user;
    next()
  }
  catch(err){
    res.status(401).json(err);
  }
}

module.exports =  Authorization;