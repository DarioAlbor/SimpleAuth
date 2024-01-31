import React, { useEffect } from 'react';

const GetSellers = ({ setUsername, setUserId }) => {
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://portal.drogueriagarzon.com/apiuser/getuserinfo', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        setUsername(data.user.firstName);
        setUserId(data.user.id); // Añadir esto para establecer el ID del usuario
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchUserInfo();
  }, [setUsername, setUserId]);

  return null; // Puedes devolver un componente vacío o cualquier otro componente necesario
};

export default GetSellers;
