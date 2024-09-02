
const userModel = require('../models/user')
const validator = require('validator')
const { Op } = require('sequelize')

const createUser = async (req, res) => {
    try {
        const email = req.body.email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                message: "Invalid email given",
                data: null
             })
          }
        const isUserAlreadyExist = await userModel.findOne({ where: { email: email } })

        if(isUserAlreadyExist) {
            return res.status(400).json({ 
                message: "User already exist",
                data: null
             })
        }

        const user = await userModel.create(req.body)
        res.status(201).json({ 
            message: "User created successfully",
            data: null
         })

    } catch (error) {
        console.log("[User creation] getting error in creating user", error);
        return res.status(400).json({ 
            message: "Getting trouble in saving user",
            data: null,
            error: error.message
         })
        
    }
}

const getUsers = async(req, res) => {
    try {

        const getUsers = await userModel.findAll({
            attributes: ['id', 'name', 'email', 'role']
        })
        res.status(200).json({
            message: "Users fetched successfully",
            data: getUsers
        })
        
    } catch (error) {
        console.log("[fetching users] getting error in fetching user", error);
        res.status(400).json({ 
            message: "Getting trouble in saving user",
            data: null,
            error: error.message
         })
        
    }
}

const updateUser = async (req, res) => {
    try {

        const userId = req.params.id
        const data  = req.body
        const user = await userModel.findByPk(userId)

        if(!user) {
            return res.status(400).json({ 
                message: "User not found",
                data: null
             })
        }

        const userEmailAssociation = await userModel.findOne({ where: { email: data.email, id : { [Op.ne]: userId } } })

        if(userEmailAssociation) {
            return res.status(400).json({ 
                message: "Given email already exist",
                data: null
             })
        }

        await userModel.update(data, { where: { id: userId } })

        return res.status(200).json({ 
            message: "User updated successfully",
            data: null
         })
        
    } catch (error) {
        console.log("[Updating user] getting error in updating user", error);
        res.status(400).json({ 
            message: "Getting trouble in update user details",
            data: null,
            error: error.message
         })
        
    }
}

const getUserDetails = async (req, res) => {
    try {
        
        const getUserDetail = await userModel.findByPk(req.params.id)

        if(!getUserDetail) {
            return res.status(400).json({ 
                message: "User not found",
                data: null
             })
        }
        res.status(200).json({
            message: "User details fetched successfully",
            data: getUserDetail
        })
    } catch (error) {
        // console.log("[fetching user details] getting error in fetching user", error);
        return res.status(400).json({
            message: "Getting trouble in fetching user details",
            data: null,
            error: error.message
        })
        
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const deletedCount = await userModel.destroy({ where: { id: userId } })

        console.log("deletedCount", deletedCount);
        
         if (deletedCount === 0) {
            res.status(404).json({ 
              message: "User not found",
              data: null
            })
          } else {
            res.status(200).json({ 
              message: "User deleted successfully",
              data: null
            })
          }
    } catch (error) {
        console.log("[Deleting user] getting error in deleting user", error);
        res.status(400).json({ 
            message: "Getting trouble in deleting user",
            data: null,
            error: error.message
         })
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    getUserDetails,
    deleteUser
}