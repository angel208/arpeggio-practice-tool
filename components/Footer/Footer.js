import React from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa';
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
                <Text color={'gray.500'}>2022 - Arpeggio Practice Tool. MIT License.</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Linkedin'} href={'https://github.com/angel208'}>
                        <FaLinkedin />
                    </SocialButton>
                    <SocialButton label={'GitHub'} href={'https://www.linkedin.com/in/angelfabriciop/'}>
                        <FaGithub />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    )
}
