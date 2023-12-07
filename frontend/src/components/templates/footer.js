'use client'

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

const añoActual = new Date().getFullYear();
const Logo = (props: any) => {
  return (
    <svg height={32} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M122,136.00012v-56a6,6,0,1,1,12,0v56a6,6,0,1,1-12,0ZM230,91.54944V164.4508a13.90917,13.90917,0,0,1-4.09961,9.89893l-51.55078,51.54981a13.90615,13.90615,0,0,1-9.89844,4.10058H91.54883a13.90853,13.90853,0,0,1-9.89942-4.10107L30.10059,174.35022A13.908,13.908,0,0,1,26,164.4508V91.54944A13.91114,13.91114,0,0,1,30.09961,81.65l51.55078-51.5498a13.90768,13.90768,0,0,1,9.89844-4.1001h72.90234a13.91006,13.91006,0,0,1,9.89942,4.10059l51.54882,51.54883A13.91,13.91,0,0,1,230,91.54944Zm-12,0a1.98775,1.98775,0,0,0-.58594-1.415L165.86523,38.58557a2.01562,2.01562,0,0,0-1.41406-.58545H91.54883a2.01164,2.01164,0,0,0-1.41309.58545L38.585,90.13489A1.98891,1.98891,0,0,0,38,91.54944V164.4508a1.98666,1.98666,0,0,0,.58594,1.41456l51.54883,51.54882a2.014,2.014,0,0,0,1.41406.58594h72.90234a2.01164,2.01164,0,0,0,1.41309-.58545l51.55078-51.5498A1.98782,1.98782,0,0,0,218,164.4508Zm-90,70.45068a10,10,0,1,0,10,10A10.01146,10.01146,0,0,0,128,162.00012Z"
        fill="#0961DF"
      />

    </svg>

  )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export default function LargeWithLogoCentered() {
    return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
          color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
                <Flex align="center" justify="right">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Empresa</ListHeader>
            <Box as="a" href={'#'}>
              Sobre nosotros
            </Box>
            <Box as="a" href={'#'}>
              Prensa
            </Box>
            <Box as="a" href={'#'}>
              Contactanos
            </Box>
            <Box as="a" href={'#'}>
              Asociados
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={'#'}>
              Uso de Cookies
            </Box>
            <Box as="a" href={'#'}>
              Política de privacidad
            </Box>
            <Box as="a" href={'#'}>
              Términos de servico
            </Box>  
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Seguinos</ListHeader>
            <Box as="a" href={'https://www.facebook.com/profile.php?id=100064364730595'}>
              Facebook
            </Box>
            <Box as="a" href={'https://www.instagram.com/drogueriagarzon'}>
              Instagram
            </Box>
            <Box as="a" href={'https://www.linkedin.com/company/drogueriagarzon'}>
              LinkedIn
             <Tag
                size={'sm'}
                bg={useColorModeValue('blue.300', 'blue.800')}
                ml={2}
                color={'white'}>
                Nuevo
              </Tag>
              </Box>
                        </Stack>
                    </SimpleGrid>
                </Flex>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © {añoActual} Droguería Garzón S.A. Todos los derechos reservados.
        </Text>
      </Box>
    </Box>
  )
}