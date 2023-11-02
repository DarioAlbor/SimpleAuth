// register.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body; // Asegúrate de que los nombres coincidan
    const user = await User.create({ firstName, lastName, email, password });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
