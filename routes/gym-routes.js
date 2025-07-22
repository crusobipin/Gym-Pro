const express = require('express');
const router = express.Router();
const {getSingleGym,editGym  } = require('../controllers/gym-controller');
const authMiddleware = require('../middleware/auth-middleware'); // Importing the authentication middleware 

router.get('/single-gym', authMiddleware, getSingleGym);
router.put('/edit-gym', authMiddleware, editGym);
module.exports = router;