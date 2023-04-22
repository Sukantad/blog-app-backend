const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.post('/users', authController.register)
authRouter.post('/login', authController.login)




module.exports = authRouter