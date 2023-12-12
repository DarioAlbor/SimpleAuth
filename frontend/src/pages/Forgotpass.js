import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPassCard from '../components/ForgotPassCard';
import axios from 'axios';

const ForgotPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleForgotPassClick = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/login/forgot-password', { email }); // Ajusta la URL
            setResetSuccess(true);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al intentar restablecer la contraseña.');
        }
    };

    return (
        <div>
            <ForgotPassCard
                handleForgotPassClick={handleForgotPassClick}
                setEmail={setEmail}
                resetSuccess={resetSuccess}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default ForgotPass;
