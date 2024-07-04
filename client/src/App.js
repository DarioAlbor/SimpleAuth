import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import ColorMode from './components/colormode';

function App() {
  return (
    <div>
      <Router>
        <Routes />
      </Router>
      <div style={{ position: 'fixed', top: '-45%', left: '1%', zIndex: 1000 }}>
        <ColorMode />
      </div>
    </div>
  );
}

export default App;
