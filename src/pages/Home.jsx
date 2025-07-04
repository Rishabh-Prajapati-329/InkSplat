import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Canvas from '../components/Canvas.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
    return (
        <div style={{ position: 'relative', height: '100%', width: '100%', overflow:"hidden" }}>
            <Navbar></Navbar>
            <Canvas></Canvas>
            <Footer></Footer>
        </div>
    )
}

export default Home
