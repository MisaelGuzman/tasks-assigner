const express = require('express');
const router = express.Router();

const { signIn, signUp } = require('../controllers/authControllers.js');//Users


router.post('/register', signUp)
router.post('/login', signIn)


module.exports = router