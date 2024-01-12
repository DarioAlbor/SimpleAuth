// Contacts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Contacts.css'; // Importa tus estilos

const Contacts = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/roles/getSellers');
        setSellers(response.data.sellers || []); // Aseguramos que 'sellers' sea un array
      } catch (error) {
        console.error('Error al obtener la lista de vendedores:', error.message);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="contacts-container">
      <h2>Vendedores</h2>
      <ul className="contacts-list">
        {Array.isArray(sellers) && sellers.length > 0 ? (
          sellers.map((seller) => (
            <li key={seller.id} className="contact-item">
              <div
                className={`status-indicator ${seller.isActive === 1 ? 'online' : 'offline'}`}
              ></div>
              <div className="contact-details">
                <p>{`${seller.firstName || ''} ${seller.lastName || ''}`}</p>
                {seller.isTyping && <span className="typing-indicator">Escribiendo...</span>}
                {seller.lastMessage && <span className="last-message">{seller.lastMessage}</span>}
              </div>
            </li>
          ))
        ) : (
          <p>No hay vendedores disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
