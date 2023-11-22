// routes/logout.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.logout);

module.exports = router;
