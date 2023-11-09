const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/getUsername', passport.authenticate('jwt', { session: false }), userController.getUsername);
router.get('/protectedData', passport.authenticate('jwt', { session: false }), userController.getProtectedData);

module.exports = router;
