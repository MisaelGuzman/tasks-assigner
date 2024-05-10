const express = require('express');
const tasksRoutes= require('./routes/tasks.routes.js');
const authRoutes = require('./routes/auth.routes.js')
require("dotenv/config");

const app = express();
//Middlewares
app.use(express.json());

app.use('/api', tasksRoutes)
app.use('/api', authRoutes);


//Env
const pEnv = process.env;
const PORT = pEnv.PORT;

//Server
app.listen(PORT, ()=> {
    console.log(`Server on: http://localhost:3000/`);
})

//SecretKey Generator
// console.log(require('crypto').randomBytes(32).toString('hex'))