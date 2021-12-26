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
        h={{base:'20px', md:'100%'}}
        w={{base:'100%', md:'auto'}}
        bottom={{base:'0', md:'auto'}}
        justify={{base:'center', md:'start'}}
        align={{base:'center', md:'start'}}
        py={{base:10, md: 20}} 
        px={8} 
        background={'white'} 
        direction={{base:'row', md:'column'}}>
            <SideBarButton route="/" Icon={CgMusic} />
            <SideBarButton route="/about" Icon={CgInfo} />
        </Stack>
    )
}
