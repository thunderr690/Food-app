const express = require ('express')
const { getuserController, updateUserController } = require("../controllers/userController")
const authmiddleware = require('../middlewares/authmiddleware')


const router = express.Router()

// Routes
//GET USER || GET
router.get('/getUser',authmiddleware, getuserController)

// UPDATE PROFILE
router.put('/updateUser', authmiddleware, updateUserController)


module.exports = router