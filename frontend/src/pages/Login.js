// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/LoginCard';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLoginClick = async () => {
        try {
            const response = await fetch('http://portal.drogueriagarzon.com/apilogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message);
            } else {
                setErrorMessage('');
                setLoginSuccess(true);

                if (data.user && data.user.id) {
                    localStorage.setItem('userId', data.user.id);

                    // Esperar 1 segundo antes de recargar la página
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <LoginCard
                handleLoginClick={handleLoginClick}
                setEmail={setEmail}
                setPassword={setPassword}
                errorMessage={errorMessage}
                loginSuccess={loginSuccess}
            />
        </div>
    );
};

export default Login;
