import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/templates/LoginCard';
import ColorModeToggle from '../components/templates/colormodetoggle';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Almacena el token en el localStorage
        navigate('/inicio');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <LoginCard
        handleLogin={handleLogin}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Login;
