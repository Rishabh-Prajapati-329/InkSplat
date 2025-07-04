import React from 'react'

const Navbar = () => {
    const style = {
        navbar: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80px',
            width: '100%',
            backgroundColor: '#282c34',
            color: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            
        },
        h1: {
            fontSize: "3rem",
        }
    }
    return (
        <div style={style.navbar}>
            <h1 style={style.h1}>InkSplat</h1>
        </div>
    )
}

export default Navbar
