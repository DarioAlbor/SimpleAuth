const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

// Configurar el almacenamiento con Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/recources'); // Directorio donde se almacenarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, 'viasalud.pdf'); // Nombre del archivo después de ser subido
    },
});

const upload = multer({ storage: storage });

// Ruta para manejar la subida de archivos PDF
router.post('/', upload.single('pdf'), (req, res) => {
    res.status(200).send('Archivo PDF subido exitosamente.');
});

module.exports = router;