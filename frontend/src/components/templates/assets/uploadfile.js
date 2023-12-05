// uploadfile.js
import React from 'react';
import { Box } from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';  // Importa FiUploadCloud
import './css/uploadfile.css'; // Ajusta la ruta según la ubicación real

const UploadFile = () => {
    return (
        <Box
            display={{ base: 'flex' }}
            onClick={() => {
                // Agrega aquí la lógica para manejar el clic en el botón "Subir pedido"
            }}
            className={`upload-button-mobile`}
        >
            <FiUploadCloud className="upload-icon" /> {/* Usa FiUploadCloud aquí */}
        </Box>
    );
};

export default UploadFile;
