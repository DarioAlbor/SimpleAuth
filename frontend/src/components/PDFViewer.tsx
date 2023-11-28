import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

const PDFViewer = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { GoToFirstPageButton, GoToPreviousPage, CurrentPageInput, GoToNextPageButton, GoToLastPageButton } =
        pageNavigationPluginInstance;

    const handlePageChange = (e: any) => {
        setCurrentPage(e.currentPage);
    };

    return (
        <div className="pdf-viewer">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <div className="viewer-wrapper">
                    <div className="top-bar">
                        <div style={{ padding: '0px 2px' }}>
                            <GoToFirstPageButton />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <GoToPreviousPage />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <CurrentPageInput />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <GoToNextPageButton />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <GoToLastPageButton />
                        </div>
                    </div>

                    <div style={{ height: '720px' }}>
                        <Viewer
                            fileUrl="/images/pdf.pdf" // Ruta relativa al archivo PDF en el directorio public
                            onPageChange={handlePageChange}
                            plugins={[pageNavigationPluginInstance]}
                            defaultScale={1.2}
                        />
                    </div>
                </div>
            </Worker>
            <div className="current-page-info">Página actual: {currentPage + 1}</div>
        </div>
    );
};

export default PDFViewer;
