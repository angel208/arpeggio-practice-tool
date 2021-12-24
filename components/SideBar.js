import React from 'react'
import Link from 'next/link'
import styles from '../styles/SideBar.module.css'
import { CgMusic, CgInfo } from 'react-icons/cg';
import { Box } from '@chakra-ui/react';

export default function SideBar() {
    return (
        <Box pos="fixed" h='100%' py={20} px={8} background={'white'}>
            <div className={styles.sidebarIcon}>
                <Link href="/"><a><CgMusic size={28}/></a></Link>
            </div>
            <div className={styles.sidebarIcon}>
                <Link href="/about"><a><CgInfo size={28}/></a></Link>
            </div>
        </Box>
    )
}
