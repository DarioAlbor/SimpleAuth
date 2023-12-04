import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import React from 'react';

import ReactDOM from 'react-dom';
import App from './PDF.tsx';
import '../index.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

