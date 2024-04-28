const express = require('express');
const router = require('./routes/appRoutes');
require("dotenv/config");

const app = express();
//Middlewares
app.use(express.json());

app.use('/api', router)

//Env
const pEnv = process.env;
const PORT = pEnv.PORT;
//Server
app.listen(PORT, ()=> {
    console.log(`Server on: http://localhost:3000/`);
})

//SecretKey Generator
// console.log(require('crypto').randomBytes(32).toString('hex'))