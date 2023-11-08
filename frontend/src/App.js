//COMPONENTES
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//RUTAS
import CustomRouter from './CustomRouter';
import Footer from './components/templates/footer';
import Register from './pages/Register';
import Login from './pages/Login'; // Agrega esta línea
import Inicio from './pages/Inicio'; // Agrega esta línea

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/" element={<CustomRouter />} />
            <Route index element={<Navigate to="/login" />} />
          </Routes>
        </Router>
        <Footer />
        <ToastContainer />
      </div>
    </ChakraProvider>
  );
}

export default App;
