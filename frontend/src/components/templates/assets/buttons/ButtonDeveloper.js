// ButtonDeveloper.js
import React from 'react';
import { Flex, Icon, Box } from '@chakra-ui/react';  // Asegúrate de importar estos componentes
import { FiCode } from 'react-icons/fi';

const ButtonDeveloper = ({ isHovered, setIsHovered, isExpanded, setIsExpanded }) => {
    return (
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
                as={FiCode}
                className={`icon`}
            />
            <Box
                ml={2}
                visibility={isHovered ? 'visible' : 'hidden'}
                transition="visibility 0.1s"
                className={`nav-item ${isExpanded ? 'sidebar-expanded' : 'nav-item-minimized'}`}
            >
                Developer
            </Box>
        </Flex>
    );
};

export default ButtonDeveloper;