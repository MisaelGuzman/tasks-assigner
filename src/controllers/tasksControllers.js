const { v4: uuidv4 } = require("uuid");
const pool = require("../dbConnection");

const getTasks = async (req, res) => {
  try {
    const resp = await pool.query(`SELECT id, title, responsable, status, description, creationdate
        FROM tasks;`);

        res.status(201).send(resp.rows)
  } catch (e) {
    console.log(e);
  }
};

const createTask = async (req, res) => {
  const id = uuidv4();
  const creationDate = new Date().toISOString().split("T")[0];
  const { title, responsable, status = 'ongoing', description } = req.body;
  const data = {
    id,
    title,
    responsable,
    status,
    description,
    creationDate,
  };
  try {
    const resp = await pool.query(`SELECT username FROM users`);
    const users = resp.rows;
    const user = users.find((u) => {
      return u.username === responsable;
    });
    if (user) {
      await pool.query(
        `INSERT INTO tasks(
                id, title, responsable, description, creationdate)
                VALUES ($1, $2, $3, $4, $5);`,
        [id, title, responsable, description, creationDate]
      );

      res.status(201).json({
        message: "Task created",
        data,
      });
    } else {
      res.status(403).json({
        message: `${responsable} doesn's exist in users table`,
      });
    }
  } catch (e) {
    console.log(e);
  }
};


const getTasksByUser = async (req, res) =>{
  const {user} = req.query
  try{
    const users = await pool.query(`SELECT * FROM users`)
    const responsable = users.rows.find((u) => {
      return u.username === user
    })
    if (responsable) {
      const resp = await pool.query(`SELECT * FROM TASKS WHERE responsable = '${responsable}'`)
      res.status(200).json(resp.rows)
    } else {
      res.status(204).json(`User: ${responsable} does not exist`)
    }
  }catch(e){
    console.log(e);
  }
}


module.exports = {
  getTasks,
  createTask,
  getTasksByUser
};
