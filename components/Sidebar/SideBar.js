import React from 'react'
import { CgMusic, CgInfo } from 'react-icons/cg';
import { VStack } from '@chakra-ui/react';
import SideBarButton from './SideBarButton';

export default function SideBar() {
    return (
        <VStack spacing={20} pos="fixed" h='100%' py={20} px={8} background={'white'}>
            <SideBarButton route="/" Icon={CgMusic} />
            <SideBarButton route="/about" Icon={CgInfo} />
        </VStack>
    )
}
