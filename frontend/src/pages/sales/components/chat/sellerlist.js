// chat/SellerList.js

import React, { useState, useEffect } from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

const SellerList = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch('https://portal.drogueriagarzon.com:3001/api/roles/getSellers');
        const data = await response.json();

        if (data.sellers !== undefined) {
          setSellers(data.sellers);
        }
      } catch (error) {
        console.error('Error al obtener la lista de vendedores:', error);
      }
    };

    fetchSellers();
  }, []);

  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" maxWidth="300px" width="100%" bgColor="rgba(255, 255, 255, 0.8)"> {/* Cambiado color de fondo a gris medio transparente */}
      <Heading as="h4" size="md" mb="4" textAlign="center" borderBottomWidth="1px" pb="2"> {/* Alineado el texto al centro */}
        Vendedores
      </Heading>
      {sellers.map((seller) => (
        <Box key={seller.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <FaUser size="20" style={{ marginRight: '8px', color: '#128C7E' }} />
          <span>{seller.firstName}</span>
          <span
            style={{
              marginLeft: '8px',
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: seller.isActive ? '#4CAF50' : '#D32F2F',
            }}
          ></span>
        </Box>
      ))}
                <Divider mt="1" mb="1" borderColor="#E5E5E5" width="100%" />
    </Box>
  );
};

export default SellerList;
