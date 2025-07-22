const express = require('express');
const router = express.Router();
const { addTrainer, getTrainers, getTrainerById, deleteTrainer, editTrainer } = require('../controllers/trainer-controller');
const authMiddleware = require('../middleware/auth-middleware'); // Importing the authentication middleware 

router.post('/add-trainer', authMiddleware, addTrainer); // Route for adding a trainer
router.get('/get-trainers', authMiddleware, getTrainers); // Route for getting all trainers
router.get('/get-trainer/:id', authMiddleware, getTrainerById); // Route for getting a trainer by id
router.delete('/delete-trainer/:id', authMiddleware, deleteTrainer); // Route for deleting a trainer
router.put('/edit-trainer/:id', authMiddleware, editTrainer); // Route for editing a trainer

module.exports = router;