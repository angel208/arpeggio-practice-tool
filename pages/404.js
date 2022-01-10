import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Heading, Text, Link as ChakraLink, VStack } from '@chakra-ui/react'

export default function NotFound() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 5000);
    }, [])

    return (
        <Container className="not-found" h={'90vh'} maxWidth={'90%'} py={10}>
            <VStack justify={'center'} h={'full'}>
                <Heading >Oooopppsss...</Heading>
                <Heading size="md">That page cannot be found, automatically redirecting...</Heading>
                <Link href="/">
                    <ChakraLink color="brand.500">go back.</ChakraLink>
                </Link>
            </VStack>
        </Container>
    )
}
