import React from 'react'
import Link from 'next/link'
import NavBar from './NavBar'
import Footer from './Footer'
import SideBar from './SideBar'

export default function Layout({children}) {
    return (
        <div className = "layout">
            <div className="sidebar">
                <SideBar />
            </div>
            
            <div className="content">
                {children}
                <Footer/>
            </div>
        </div>
    )
}
