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
                bg: 'cyan.400',
                color: 'white',
            }}
        >
            <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                    color: 'white',
                }}
                as={FiShoppingCart} 
                className={`icon`}
            />
            <Box
                ml={2}
                visibility={isHovered ? 'visible' : 'hidden'}
                transition="visibility 0.1s"
                className={`nav-item ${isExpanded ? 'sidebar-expanded' : 'nav-item-minimized'}`}
            >
                Vendedor
            </Box>
        </Flex>
        </Link>
    );
};

export default ButtonSales;
