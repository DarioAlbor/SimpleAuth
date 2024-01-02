// Search.jsx

import React, { useState } from 'react';
import { Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { FiSearch, FiX } from 'react-icons/fi';
import './css/search.css'; // Importa el archivo CSS

const Search = ({ colorMode }) => {
  const [searchText, setSearchText] = useState('');

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleSearch = () => {
    // Lógica de búsqueda aquí con el valor de searchText
    console.log('Usted está buscando:', searchText);
  };

  const searchInputClass = `search-input ${colorMode === 'light' ? 'light-mode' : 'dark-mode'}`;
  const searchInputGroupClass = `search-input-group ${colorMode === 'light' ? 'light-mode' : 'dark-mode'}`;

  return (
    <div className="search-container">
      <InputGroup className={searchInputGroupClass} width={{ base: '100%', md: '500px' }} px="4">
        {searchText !== '' && (
          <InputLeftElement h="100%" lineHeight="1">
            <IconButton
              aria-label="Clear search"
              icon={<FiX className="clear-search-button" />}
              onClick={handleClearSearch}
              size="sm"
              borderRadius="50%"
            />
          </InputLeftElement>
        )}
        <Input
          variant="unstyled"
          placeholder="Ingresa descripción o código del producto.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          py="3"
          lineHeight="1"
          className={searchInputClass}
        />
        <InputRightElement h="100%" lineHeight="1">
          <IconButton
            aria-label="Search"
            icon={<FiSearch className="search-button" />}
            color="white"
            borderRadius="full"
            onClick={handleSearch}
          />
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default Search;
