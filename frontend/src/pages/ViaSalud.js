import React from 'react';
import PDF from '../components/PDFViewer/PDF.tsx';
import Sidebar from '../components/templates/sidebar';
import Chatbot from '../components/Chatbot'

const ViaSalud = () => {


    return (
        <div>
        <Chatbot />
        <Sidebar />
        <PDF />
        </div>
    );
};

export default ViaSalud;
