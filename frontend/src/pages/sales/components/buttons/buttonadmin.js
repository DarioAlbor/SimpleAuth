// ButtonAdmin.js
import React, { useState } from 'react';
import { Flex, Icon, Box, VStack, Text } from '@chakra-ui/react';
import { MdEmojiFlags } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ButtonAdmin = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flex
      direction="column"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Link to="/admin/panel">
        <Flex
          align="center"
          p="3"
          mx="0"
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
            mr="2"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={MdEmojiFlags}
            className={`icon`}
          />
          <Box ml={0} className={`nav-item`}>
            Panel de Remitos
          </Box>
        </Flex>
      </Link>

    </Flex>
  );
};

export default ButtonAdmin;
