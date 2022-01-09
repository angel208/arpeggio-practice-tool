import React from 'react'
import { CgMusic, CgInfo } from 'react-icons/cg';
import { Stack, Flex } from '@chakra-ui/react';
import SideBarButton from './SideBarButton';

export default function SideBar() {
    return (
        <Stack 
        spacing={20} 
        pos="fixed" 
        zIndex={9000}
        h={{base:'20px', lg:'100%'}}
        w={{base:'100%', lg:'auto'}}
        bottom={{base:'0', lg:'auto'}}
        justify={{base:'center', lg:'start'}}
        align={{base:'center', lg:'start'}}
        py={{base:10, lg: 20}} 
        px={8} 
        background={'white'} 
        direction={{base:'row', lg:'column'}}>
            <SideBarButton route="/" Icon={CgMusic} />
            <SideBarButton route="/about" Icon={CgInfo} />
        </Stack>
    )
}
