import React from 'react';

interface PDFThumbnailProps {
    onClick: () => void;
}

const PDFThumbnail: React.FC<PDFThumbnailProps> = ({ onClick }) => {
    return (
        <div className="pdf-thumbnail" onClick={onClick}>
            {/* Coloca tu imagen para la miniatura aquí */}
            <img src="/images/pdf-thumbnail.png" alt="PDF Thumbnail" />
        </div>
    );
};

export default PDFThumbnail;
