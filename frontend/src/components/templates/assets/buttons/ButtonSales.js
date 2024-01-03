// ButtonSales.js
import React from 'react';
import { Flex, Icon, Box } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';

const ButtonSales = ({ isHovered, setIsHovered, isExpanded, setIsExpanded }) => {
    return (
        <Link to="/sales">
        <Flex
            onMouseEnter={() => {
                setIsHovered(true);
                setIsExpanded(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsExpanded(false);
            }}
            align="center"
            p="5"
            mx="1"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: 'red.400',
                color: 'black',
            }}
        >
            <Icon
                mr="0"
                fontSize="16"
                _groupHover={{
                    color: 'black',
                }}
                as={FiShoppingCart} 
                className={`icon`}
            />
            <Box
                ml={2}
                opacity={isHovered ? '1' : '0'}  
                // Ajusté aquí
                className={`nav-item ${isExpanded ? 'sidebar-expanded' : 'nav-item-minimized'}`}
            >
                Vendedor
            </Box>
        </Flex>
        </Link>
    );
};

export default ButtonSales;
