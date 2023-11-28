import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../components/templates/sidebar';
import PDFViewer from '../components/PDFViewer.tsx'; // Asegúrate de ajustar la ruta correcta

const ViaSalud: React.FC = () => {
    // Puedes agregar lógica específica de ViaSalud aquí si es necesario

    return (
        <div>
            <SidebarWithHeader />
            <div>
                {/* Tu contenido aquí */}
                <PDFViewer pdfUrl="/images/pdf.pdf" />
            </div>
        </div>
    );
};

export default ViaSalud;
