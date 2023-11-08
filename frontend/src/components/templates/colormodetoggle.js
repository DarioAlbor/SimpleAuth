'use client'

import { Button, Flex, useColorMode } from '@chakra-ui/react'
import { BsSun, BsMoonStarsFill } from 'react-icons/bs'

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    /**
     * Ideally, only the button component should be used (without Flex).
     * Props compatible with <Button /> are supported.
     */
    <Flex h="10vh" mr={5} justifyContent="right" alignItems="center">
      <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: 'none' }}
        w="fit-content">
        {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
    </Flex>
  )
}