const express = require('express')

const authmiddleware = require('../middlewares/authmiddleware')
const { createResturantController, getAllResturantController, getResturantByidController } = require('../controllers/restaurantcontroller')

const router = express.Router()

//routes


// CREATE RESTURANT || POST
router.post('/create', authmiddleware, createResturantController)

// GET ALL RESTURANT || GET
router.get('/getAll', getAllResturantController )

// GET RESTURANT BY ID || GET
router.get('/get/:id', getResturantByidController)

module.exports = router