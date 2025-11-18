const express = require('express')

const authmiddleware = require('../middlewares/authmiddleware')
const { createCatController } = require('../controllers/categoryController')


const router = express.Router()

//routes

//create
router.post('/create', authmiddleware, createCatController)

module.exports = router