const express = require('express');
const { userRegister, userLogin } = require('../controllers/usersControllers');
const { createTask, getTasks, getTasksByUser } = require('../controllers/tasksControllers');
const {secureToken, adminValidator} = require('../controllers/tokenControllers');
const router = express.Router();

//Users
router.post('/register', userRegister)
router.post('/login', userLogin)

//Admin Tasks
router.get('/tasks', adminValidator, getTasks);
router.post('/createtask', adminValidator, createTask);

//NormalUsers
router.get('/usertaks', secureToken, getTasksByUser)


module.exports = router