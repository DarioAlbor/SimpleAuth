import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/templates/footer';
import CustomRouter from './CustomRouter';

function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/*" element={<CustomRouter />} />
                    </Routes>
                </Router>
                <Footer />
                <ToastContainer />
            </div>
        </ChakraProvider>
    );
}

export default App;
