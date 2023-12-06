const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta para obtener la lista de imágenes del carrusel
router.get('/', (req, res) => {
    const carouselFolderPath = path.join(__dirname, '../assets/carousel');

    // Lee la lista de archivos en la carpeta del carrusel
    fs.readdir(carouselFolderPath, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta del carrusel:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Filtra solo los archivos de imagen (puedes ajustar esto según tus extensiones de archivo)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        // Construye las URLs completas de las imágenes
        const imageUrls = imageFiles.map(file => `/upload/carousel/${file}`);

        res.json({ images: imageUrls });
    });
});

module.exports = router;
