const express = require('express');

const { createTask, getTasks, getTasksByUser } = require('../controllers/tasksControllers');
const {verifyToken, isAdmin} = require('../middlewares/tokenControllers');
const router = express.Router();



//Admin Tasks
router.get('/tasks', [verifyToken ,isAdmin], getTasks);
router.post('/createtask', [verifyToken ,isAdmin], adminValidator, createTask);
router.get('/usertaks', verifyToken, getTasksByUser)


module.exports = router