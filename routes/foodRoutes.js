const express = require('express')

const authmiddleware = require('../middlewares/authmiddleware')
const { createFoodController, updateFoodController, deleteFoodController, getAllFoodController, getFoodByResturantController, getSingleFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController')
const adminMiddleware = require('../middlewares/adminMiddleware')


const router = express.Router()

//routes
//create food
router.post('/create', authmiddleware, createFoodController)

// GET ALL FOOD
router.get('/getAll', getAllFoodController)

// SINGLE FOOD
router.get('/get/:id', getSingleFoodController)

//GET FOOD BY RESTURANT
router.get('/getByrestaurant/:id', getFoodByResturantController)

//UPDATE FOOD
router.put('/update/:id', authmiddleware, updateFoodController)

//DELETE FOOD
router.delete('/delete/:id', authmiddleware, deleteFoodController)

//PLACE ORDER
router.post('/placeOrder', authmiddleware, placeOrderController)

// ORDER STATUS
router.post('/orderStatus/:id', authmiddleware, adminMiddleware, orderStatusController)


module.exports = router