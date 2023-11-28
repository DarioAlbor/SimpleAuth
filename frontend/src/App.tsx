import React from 'react';
import PDFViewer from './components/PDFViewer';
import PDFList from './components/PDFList';

const App = () => {
    return (
        <div className="app-container">
            <h1>Visor de PDF Personalizado</h1>
            <div className="app-content">
                <PDFViewer />
                <PDFList />
            </div>
        </div>
    );
};

export default App;
