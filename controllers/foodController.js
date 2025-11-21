const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

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
        const food = new foodModel({ title, description, price, imageURL, foodTags, category, code, isAvailable, resturant, rating, ratingCount })
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
        if (!foods) {
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
        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Food ID is required"
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
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
        if (!Resturantid) {
            return res.status(400).send({
                success: false,
                message: "Food ID is required"
            })
        }
        const food = await foodModel.find({ resturant: Resturantid })
        if (!food) {
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
            message: "Error in Get Food RESTURANT API",
            error
        })
    }
}

//UPDATE FOOD
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        const updateData = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, updateData, { new: true });
        if (!updatedFood) {
            return res.status(404).send({
                success: false,
                message: "Food Not Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Food Updated Successfully",
            updatedFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Food API",
            error
        })
    }
}

//DELETE FOOD
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        const deletedFood = await foodModel.findById(foodId);
        if (!deletedFood) {
            return res.status(404).send({
                success: false,
                message: "Food Not Found"
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Deleted Successfully",
            deletedFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Food API",
            error
        })
    }
}

//PLACE ORDER
const placeOrderController = async (req, res) => {
    try {
        const { cart, } = req.body;
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "Cart and Payment information are required"
            })
        }
        let total = 0
        //cal
        cart.map((item) => {
            total += item.price
        })
        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.user._id
        });
        await newOrder.save()
        res.status(201).send({
            success: true,
            message: "Order Placed Successfully",
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Place Order API",
            error
        })
    }
}

// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Order ID is required"
            })
        }
        const { status } = req.body
        if (!status) {
            return res.status(400).send({
                success: false,
                message: "Status is required"
            })
        }   
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Order Status API",
            error
        })

    }
}

module.exports = { createFoodController, updateFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController, deleteFoodController, placeOrderController, orderStatusController }