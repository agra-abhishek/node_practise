const User = require('../models/User');
const { hashPassword } = require("../utils/password");


// Crete A user for POST
const createUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
           age
        });
        console.log("BODY:", req.body);
        res.status(201).json({
            success: true,
            message: 'User Created Sucessfully',
            data: user,
        })
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Get All user 
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, data: users });
        

    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//  get user by Id

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });

        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
}
// PATCH /patch/:id
const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await hashPassword(req.body.password);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "User updated",
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
}

// delete
const deleteUser = async(req , res) =>{
    try{
 await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted" });
    }
    catch(error){
    res.status(500).json({ success: false, error: error.message });

    }
}

const getUserInfo = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ success: true, data: user });
};
module.exports = { createUser, getAllUsers, getUserById ,updateUser, deleteUser , getUserInfo}