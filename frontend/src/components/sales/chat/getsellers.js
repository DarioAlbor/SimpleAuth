// chat/getsellers.js

import React, { useState, useEffect } from 'react';

const GetSellers = ({ setUsername }) => {
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/getuserinfo', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        setUsername(data.user.firstName);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchUserInfo();
  }, [setUsername]);

  return null; // Puedes devolver un componente vacío o cualquier otro componente necesario
};

export default GetSellers;
