import React from 'react';
import SignupCard from '../components/SignupCard'; 
import ColorModeToggle from '../components/templates/colormodetoggle';

const Register = () => {
  const handleSignUp = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch('https://portal.drogueriagarzon.com:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <SignupCard handleSignUp={handleSignUp} />
    </div>
  );
};

export default Register;
