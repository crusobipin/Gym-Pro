const express = require('express');
const router = express.Router();
const { registerGymWithOwner,userLogin,getGymMembers,addUserToGym,deleteMember,editMember,getMemberById } = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware'); // Importing the authentication middleware

    router.post('/register', registerGymWithOwner); // Route for gym registration
    router.post('/login', userLogin); // Route for user login
    router.get('/members', authMiddleware, getGymMembers); // Route for getting gym members
    router.post('/add-user', authMiddleware, addUserToGym); // Route for adding a user to a gym
    router.delete('/delete-member/:id', authMiddleware, deleteMember); // Route for deleting a member
    router.put('/edit-member/:id', authMiddleware, editMember); // Route for editing a member
    router.get('/get-member/:id', authMiddleware, getMemberById); // Route for getting a member by id
module.exports = router; // Exporting the router to use in server.js        