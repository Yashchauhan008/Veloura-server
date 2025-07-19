const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update', userController.updateUser);
router.get('/feed',userController.feed);
router.get('/getUserHistory',userController.getUserHistory);





module.exports = router;
