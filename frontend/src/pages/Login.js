import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/templates/LoginCard';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLoginClick = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/login', {
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

                    // Esperar 5 segundos antes de redirigir
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 5000);
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
