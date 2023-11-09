import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomRouter from './CustomRouter';
import Footer from './components/templates/footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route index element={<Login />} />
            <Route
              path="/inicio"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<CustomRouter />} />
          </Routes>
        </Router>
        <Footer />
        <ToastContainer />
      </div>
    </ChakraProvider>
  );
}

export default App;
