const jwt = require('jsonwebtoken');
const { MYSECRETKEY } = require('./usersControllers');

//verify token
const secureToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log(token)
        jwt.verify(token, MYSECRETKEY, (e, user) => {
          if (e) {
            res.status(403).json("Token not Valid!")
          }
          req.user = user
          next();
        })
      } else {
        res.status(402).json("You are not Authenticated!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //admin
  const adminValidator = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, MYSECRETKEY, (e, user) => {
          if (e) {
            res.status(403).json("Token not Valid!")
          }
          req.user = user
          if (user.isadmin === true) {
              next();
          } else {
            res.status(401).json("You are Unauthorized")
          }
        })
      } else {
        res.status(402).json("You are not Authenticated!");
      }
    } catch (e) {
      console.log(e);
    }
  };



module.exports = {
  secureToken,
  adminValidator
} 