import React from 'react';
import PDFThumbnail from './PDFThumbnail';

const PDFList = () => {
    const handleThumbnailClick = () => {
        // Lógica para abrir el visor de PDF al hacer clic en la miniatura
        // Puedes usar algún estado o contexto para controlar la visibilidad del visor
    };

    return (
        <div className="pdf-list">
            <PDFThumbnail onClick={handleThumbnailClick} />
            {/* Agrega más miniaturas según sea necesario */}
        </div>
    );
};

export default PDFList;
