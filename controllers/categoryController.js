const categoryModel = require('../models/categoryModel');


const createCatController = async (req, resp) => {
    try {
        const { title, imageUrl } = req.body
        // validation
        if (!title) {
            return resp.status(500).send({
                success: false,
                message: "please Provide category title and image"
            })
        }
        const newCategory = new categoryModel({ title, imageUrl })
        await newCategory.save()
        resp.status(201).send({
            success: true,
            message: "New Category Created Successfully",
            newCategory
        })

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Create Category API",
            error
        })
    }
}


module.exports = { createCatController }
