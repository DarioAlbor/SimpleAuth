// Search.jsx

import { Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import './css/search.css'; // Importa el archivo CSS

const Search = () => {
    const [searchText, setSearchText] = useState('');

    const handleClearSearch = () => {
        setSearchText('');
    };

    const handleSearch = () => {
        // Lógica de búsqueda aquí con el valor de searchText
        console.log('Usted esta buscando:', searchText);
    };

    return (
        <div className="search-container">
            <InputGroup
                className="search-input-group"  // Agrega la nueva clase aquí
                width={{ base: '100%', md: '500px' }}
                px="4"
            >
                {searchText !== '' && (
                    <InputLeftElement h="100%" lineHeight="1">
                        <IconButton
                            aria-label="Clear search"
                            icon={<FiX className="clear-search-button" />}
                            onClick={handleClearSearch}
                            size="sm"
                            borderRadius="none"
                            _hover={{
                                bg: 'transparent',
                            }}
                        />
                    </InputLeftElement>
                )}
                <Input
                    variant="unstyled"
                    placeholder="Ingresa descripcion o codigo del producto.."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    py="3"
                    lineHeight="1"
                    className="search-input" // Agrega la clase para el estilo del input
                />
                <InputRightElement h="100%" lineHeight="1">
                    <IconButton
                        aria-label="Search"
                        icon={<FiSearch className="search-button" />}
                        color="black"
                        borderRadius="full"
                        onClick={handleSearch}
                    />
                    
                </InputRightElement>
            </InputGroup>
        </div>
    );
};

export default Search;
