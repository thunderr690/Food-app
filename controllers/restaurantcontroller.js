const restaurantModel = require('../models/restaurantmodel')

//CREATE RESTURANT
const createResturantController = async (req, resp) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body
        // validation
        if (!title || !coords) {
            return resp.status(500).send({
                success: false,
                message: "please Provide title and address"
            })
        }
        const newResturant = new restaurantModel({ title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords })
        await newResturant.save()
        resp.status(201).send({
            success: true,
            message: "New Resturant Created Successfully"
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in create Resturant API",
            error
        })

    }
}

//GET ALL RESTURANT 
const getAllResturantController = async (req, resp) => {
    try {
        const resturant = await restaurantModel.find({})
        if(!resturant){
            return resp.status(404).send({
                success:false,
                message: "No Resturant Availible"
            })
        }
        resp.status(200).send({
            success: true,
            totalCount:resturant.length,
            resturant
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Get All Resturant API",
            error
        })
    }
}
// GET RESTURANT BY ID
const getResturantByidController = async (req, resp) => {
    try {
        const resturantid = req.params.id
        if(!resturantid){
            return resp.status(404).send({
                success: false,
                message:"Please Provide Resturant ID"
            })
        }
        //find Resturant
        const resturant = await restaurantModel.findById(resturantid)
        if (!resturant) {
            return resp.status(404).send({
                success: false,
                message: "No resturant"
            })
        }
        resp.status(200).send({
            success: true,
            resturant
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Get Resturant by id API",
            error
        })
        
    }
}

module.exports = { createResturantController, getAllResturantController, getResturantByidController }