const express = require ('express')
const { registerController } = require('../controllers/authcontroller')

const router  = express.Router()

//routes
//REgISTER || POST
router.post('/register', registerController)

module.exports = router