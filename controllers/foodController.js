const foodModel = require("../models/foodModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
    try {
        const { title, description, price, imageURL, foodTags, category, code, isAvailable, resturant, rating, ratingCount } = req.body
        //validation
        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: "Please provide all required fields"
            })
        }
        const food = new foodModel({title, description, price, imageURL, foodTags, category, code, isAvailable, resturant, rating, ratingCount})
        await food.save()
        res.status(201).send({
            success: true,
            message: "New Food Created",
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Food API",
            error
        })

    }
}

//GET ALL FOOD
const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "No Food Found"
            })
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Food API",
            error
        })
    }
}

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(400).send({
                success: false,
                message: "Food ID is required"
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Food Not Found"
            })
        }
        res.status(200).send({
            success: true,
            food
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get Single Food API",
            error
        })
    }
}

// GET FOOD by RESTAURANT
const getFoodByResturantController = async (req, res) => {
    try {
        const Resturantid = req.params.id
        if(!Resturantid){
            return res.status(400).send({
                success: false,
                message: "Food ID is required"
            })
        }
        const food = await foodModel.find({resturant:Resturantid})
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Food Not Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Food Fetched By Restaurant Successfully",
            food
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get Single Food API",
            error
        })
    }
}

module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController }