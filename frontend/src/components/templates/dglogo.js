import React from 'react';
import { Avatar, Box, keyframes } from '@chakra-ui/react';
import dglogo from '../assets/dglogo.png'; 

const AvatarWithRipple = () => {
  const size = '96px';
  const color = 'teal';

  const pulseRing = keyframes`
    0% {
      transform: scale(0.33);
    }
    40%,
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  `;

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <Box
        as="div"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={size}
        h={size}
        _before={{
          content: "''",
          position: 'absolute',
          display: 'block',
          width: '300%',
          height: '300%',
          boxSizing: 'border-box',
          marginLeft: '-100%',
          marginTop: '-100%',
          borderRadius: '50%',
          bgColor: color,
          animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
        }}
      >
        <Avatar src={dglogo} alt="Droguería Garzón" size="full" position="absolute" top={0} left={0} />
      </Box>
    </div>
  );
};

export default AvatarWithRipple;
