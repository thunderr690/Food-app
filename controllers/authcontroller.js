const  userModel  = require("../models/userModel")

const registerController = async (req, resp) => {
    try {
        const { userName, email, password, phone, address } = req.body
        //validation
        if (!userName || !email || !password || !phone) {
            return resp.status(500).send({
                success: false,
                message: 'please Provide All Fields'
            })
        }
        //checks users
        const existing = await userModel.findOne({ email })
        if (existing) {
            return resp.status(500).send({
                success: false,
                message: 'Email Already Registerd Please Login'
            })
        }
        //crete new user
        const user = await userModel.create({ userName, email, password, address, phone })
        resp.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error in register API',
            error
        })

    }
}


module.exports = { registerController }