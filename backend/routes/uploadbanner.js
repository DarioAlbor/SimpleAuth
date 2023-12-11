const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const carouselDirectory = 'assets/carousel';

// Verificar y crear el directorio si no existe
if (!fs.existsSync(carouselDirectory)) {
    fs.mkdirSync(carouselDirectory);
}

// Configurar el almacenamiento con Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, carouselDirectory);
    },
    filename: function (req, file, cb) {
        const originalFilename = file.originalname;
        let bannerName = 'unknown';

        // Obtener el número del banner desde el nombre del archivo
        const bannerNumberMatch = originalFilename.match(/\d+/);
        if (bannerNumberMatch) {
            const bannerNumber = bannerNumberMatch[0];

            // Formar el nombre del banner con el prefijo "banner"
            bannerName = `banner${bannerNumber}`;
        }

        // Guardar el nuevo archivo con el nombre del banner
        cb(null, `${bannerName}.${originalFilename.split('.').pop()}`);
    },
});


const upload = multer({ storage: storage });

// Ruta para manejar la subida de banners
router.post('/', upload.single('image'), (req, res) => {
    // Imprimir el nombre del archivo original y el nombre del banner desde la solicitud
    console.log('Original Filename from Request:', req.file.originalname);
    console.log('Banner Name from Request:', req.body.bannerName);

    res.status(200).send('Banner subido exitosamente.');
});

module.exports = router;
