import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import SocialButton from './SocialButton';
import {
    Box,
    Container,
    Stack,
    Text,
} from '@chakra-ui/react';


  
export default function Footer() {
    return (
        <Box bg="none" borderTop='solid 1px' borderColor='gray.200' zIndex={-1000}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text color={'gray.500'}>2022 Arpeggio Practice Tool. MIT License</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Twitter'} href={'#'}>
                        <FaTwitter />
                    </SocialButton>
                    <SocialButton label={'YouTube'} href={'#'}>
                        <FaYoutube />
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'#'}>
                        <FaInstagram />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    )
}
