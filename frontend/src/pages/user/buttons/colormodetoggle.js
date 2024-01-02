import { Button, Flex, useColorMode, Switch } from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex h="5vh" justifyContent="center" alignItems="center">
      <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: 'none' }}
        w="fit-content"
        mr={2} // Agrega un margen a la derecha para separar el botón del interruptor
      >
        {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
      <Switch
        size="md"
        colorScheme="teal"
        isChecked={colorMode === 'dark'} // Ajusta el estado del interruptor según el modo de color
        onChange={toggleColorMode} // Cambia el modo de color al cambiar el interruptor
      />
    </Flex>
  );
}
