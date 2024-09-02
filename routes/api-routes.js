const { createUser, getUsers , updateUser, getUserDetails, deleteUser } = require('../controllers/user-controller')
const express = require('express')
const router = express.Router()
const { validateUserInput } = require('../validators/user-validator')

router.post('/save/user', validateUserInput, createUser)
router.get('/users', getUsers)
router.put('/update/user/:id', updateUser)
router.get('/user/:id', getUserDetails)
router.delete('/user/:id', deleteUser)

module.exports = router