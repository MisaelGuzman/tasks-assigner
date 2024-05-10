const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../dbConnection");
require("dotenv/config");

const MYSECRETKEY = require('../config.js');
const { encrypt, compare } = require("../helpers/bcryptHelper.js");

//SignUp
const signUp = async (req, res) => {
  const id = uuidv4();
  const { username, password, isadmin = false } = req.body;
  const encryptPass = await encrypt(password);
  const data = {
    id,
    username,
    encryptPass,
    isadmin,
  };

  try {

    await pool.query(
      `INSERT INTO users(
            id, username, password, isadmin)
            VALUES ($1, $2, $3, $4);`,
      [id, username, encryptPass, isadmin]
    );

    const token = jwt.sign({id: id, isadmin: isadmin}, MYSECRETKEY,  {
      expiresIn: '24h'
    })

    res.status(201).json({
      message: "User Created",
      token
    });


  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'user already exist'});
  }
};

//login function
const signIn = async (req, res) => {
  const { username, password } = req.query;
  try {

    const users = await pool.query(`SELECT username, password, isadmin
        FROM users;`);
    const user = users.rows.find((u) => {
      return u.username === username;
    });

    const compare = compare(user[0].password) ;

    if(!compare) return res.status(401).json({token: null, message: "Invalid Password"});

       const token = jwt.sign(
        { id: user[0].id, isadmin: user[0].isadmin },
        MYSECRETKEY, 
        {expiresIn: "24h"}
      );
      
      res.json({
        token,
      });

  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signUp,
  signIn,
};
