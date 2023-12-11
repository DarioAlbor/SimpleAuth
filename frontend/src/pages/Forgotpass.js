import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPassCard from '../components/ForgotPassCard';

const ForgotPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleForgotPassClick = async () => {
        try {
            // Lógica de recuperación de contraseña aquí
            // Puedes manejar la lógica de backend similar a la de login
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
