const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', authMiddleware, userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/login', userController.userLogin);
router.get('/userinfo', authMiddleware, userController.getUserInfo);
router.put('/userinfo', authMiddleware, userController.updateUserInfo);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;