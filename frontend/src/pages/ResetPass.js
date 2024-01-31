import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResetPassCard from '../components/ResetPassCard';
import axios from 'axios';

const ResetPass = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    useEffect(() => {
        // Lógica para verificar el token, por ejemplo, haciendo una solicitud al servidor
        const validateToken = async () => {
            try {
                const response = await axios.post('http://portal.drogueriagarzon.com:3001/api/login/validate-reset-token', { token });
                if (response.data.valid) {
                    // Token válido, puedes hacer más cosas aquí si es necesario
                    setEmail(response.data.email); // Suponiendo que el servidor devuelve el email asociado con el token
                } else {
                    setErrorMessage('Token inválido. No se puede restablecer la contraseña.');
                }
            } catch (error) {
                console.error('Error al validar el token:', error);
                setErrorMessage('Error al validar el token.');
            }
        };

        validateToken();
    }, [token]);

    const handleResetPassClick = async (newPassword) => {
        // Lógica para restablecer la contraseña, por ejemplo, haciendo una solicitud al servidor
        try {
            const response = await axios.post('http://portal.drogueriagarzon.com:3001/api/login/reset-password', {
                email,
                token,
                newPassword,
            });
            if (response.data.success) {
                // Contraseña restablecida con éxito
                setResetSuccess(true);
            } else {
                setErrorMessage('Error al restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setErrorMessage('Error al restablecer la contraseña.');
        }
    };

    return (
        <div>
            <ResetPassCard
                handleResetPassClick={handleResetPassClick}
                resetSuccess={resetSuccess}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default ResetPass;