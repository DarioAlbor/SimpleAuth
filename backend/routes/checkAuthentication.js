// checkAuthentication.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.userId) {
        // El usuario está autenticado
        res.status(200).json({ authenticated: true });
    } else {
        // El usuario no está autenticado
        res.status(401).json({ authenticated: false });
    }
});

module.exports = router;
