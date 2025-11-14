// GET USER INFGO

const userModel = require("../models/userModel");

const getuserController = async (req, resp) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.user.id})
        //validation
        if(!user){
            return resp.status(404).send({
                success:false,
                message:"User Not Found"
            })
        }
        //hide password
        user.password = undefined
        //resp
        resp.status(200).send({
            success:true,
            message: "User get Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message: "Error in Get User API",
            error
        })
        
    }
    
}
// UPDATE USER
const updateUserController = async (req, resp) => {
    try {
        //FInd User
        const user = await userModel.findById(req.user.id)
        //validation
        if(!user){
            return resp.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        //update
        const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        //save user
        await user.save()
        resp.status(200).send({
            success:true,
            message: "User Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:"Error in Update User API",
            error
        })
        
    }
}

module.exports = { getuserController, updateUserController }