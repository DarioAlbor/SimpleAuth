// ButtonDirector.js
import React from 'react';
import { Flex, Icon, Box } from '@chakra-ui/react';  
import { RiAdminFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ButtonDirector = ({ isHovered, setIsHovered, isExpanded, setIsExpanded }) => {
    return (
        <Link to="/admin">
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
                as={RiAdminFill}
                className={`icon`}
            />
            <Box
                ml={2}
                visibility={isHovered ? 'visible' : 'hidden'}
                transition="visibility 0.1s"
                className={`nav-item ${isExpanded ? 'sidebar-expanded' : 'nav-item-minimized'}`}
            >
                Director
            </Box>
        </Flex>
        </Link> 
    );
};

export default ButtonDirector;