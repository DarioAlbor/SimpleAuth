// uploadfile.js
import React from 'react';
import { Box } from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';  // Importa FiUploadCloud
import './css/uploadfile.css'; // Ajusta la ruta seg�n la ubicaci�n real

const UploadFile = () => {
    return (
        <Box
            display={{ base: 'flex' }}
            onClick={() => {
                // Agrega aqu� la l�gica para manejar el clic en el bot�n "Subir pedido"
            }}
            className={`upload-button-mobile`}
        >
            <FiUploadCloud className="upload-icon" /> {/* Usa FiUploadCloud aqu� */}
        </Box>
    );
};

export default UploadFile;