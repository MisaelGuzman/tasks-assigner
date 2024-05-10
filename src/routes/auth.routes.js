const { userRegister, userLogin } = require('../controllers/authControllers');//Users


router.post('/register', userRegister)
router.post('/login', userLogin)