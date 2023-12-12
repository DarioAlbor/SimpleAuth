import React from 'react';
import { Flex, Icon, Box } from '@chakra-ui/react';
import { TfiPencilAlt } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const ButtonDesigner = ({ isHovered, setIsHovered, isExpanded, setIsExpanded }) => {
    return (
        <Link to="/design">
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
                position="relative"
            >
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        color: 'white',
                    }}
                    as={TfiPencilAlt}
                    className={`icon`}
                />
                <Box
                    ml={2}
                    visibility={isHovered ? 'visible' : 'hidden'}
                    transition="visibility 0.1s"
                    className={`nav-item ${isExpanded ? 'sidebar-expanded' : 'nav-item-minimized'}`}
                >
                    Diseñador
                </Box>
            </Flex>
        </Link>
    );
};

export default ButtonDesigner;
