import React from 'react'
import Footer from './Footer/Footer'
import SideBar from './Sidebar/SideBar'
import {Container, Box} from '@chakra-ui/react'

export default function Layout({children}) {
    return (
        <Box background={'body.100'}>
            <SideBar />

            <Container maxW='container.xl' h="fit-content" p={0}>
                <Box>
                    {children}
                </Box>
                <Footer/>
            </Container>
        </Box>
    )
}
