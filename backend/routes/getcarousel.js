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

        // Lee y codifica cada imagen a base64
        const base64Images = imageFiles.map(file => {
            const imagePath = path.join(carouselFolderPath, file);
            const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
            return `data:image/jpeg;base64,${imageBase64}`;
        });

        res.json({ images: base64Images });
    });
});

module.exports = router;