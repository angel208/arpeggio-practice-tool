import React from 'react'
import Link from 'next/link'
import styles from '../styles/SideBar.module.css'
import { CgMusic, CgInfo } from 'react-icons/cg';

export default function SideBar() {
    return (
        <>
            <div className={styles.sidebarIcon}>
                <Link href="/"><a><CgMusic size={28}/></a></Link>
            </div>
            <div className={styles.sidebarIcon}>
                <Link href="/about"><a><CgInfo size={28}/></a></Link>
            </div>
            
        </>
    )
}
