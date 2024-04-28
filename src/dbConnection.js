const pkg = require ('pg');
require('dotenv/config');

const {Pool} = pkg;

//ENV
const pEnv = process.env;
const USER = pEnv.PGUSER;
const HOST = pEnv.PGHOST;
const DATABASE = pEnv.PGDATABASE;
const PASSWORD = pEnv.PGPASSWORD;

//config
const config = {
    user: USER,
    host: HOST,
    password: PASSWORD,
    database: DATABASE
}

const pool = new Pool(config);


module.exports = pool
