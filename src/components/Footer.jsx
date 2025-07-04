import React, { useContext } from 'react'
import { CanvasContext } from '../context/CanvasContext'

const Footer = () => {

    const { canvas, updateCanvas } = useContext(CanvasContext);

    return (
        <footer style={{ position: "fixed", bottom: "0", height: '50px', width: "100%", padding: "0 1rem", background: "#282c34", color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

            <p style={{ fontSize: "1rem", paddingRight: "1.5rem", borderRight: "0.1mm solid #fff" }}>InkSplat</p>

            <div style={{ minWidth: "30%", maxWidth: "80%", display: 'flex', justifyContent: "space-between", alignItems: "center", gap: '10px' }}>

                <div style={{ display: 'flex', alignItems: "center", gap: '20px', paddingLeft: "0.7rem" }}>
                    <label style={{ textAlign: "center" }}>
                        Brush Size:
                        <input
                            type="number"
                            value={canvas.brushRadius}
                            onChange={(e) => updateCanvas({ brushRadius: parseInt(e.target.value) })}
                            min="2"
                            max="25"
                            style={{ marginLeft: '10px', width: '50px' }}
                        />
                    </label>
                    <label style={{ textAlign: "center" }}>
                        Lazy Size:
                        <input
                            type="number"
                            value={canvas.lazyRadius}
                            onChange={(e) => updateCanvas({ lazyRadius: parseInt(e.target.value) })}
                            min="0"
                            max="50"
                            step="5"
                            style={{ marginLeft: '10px', width: '50px' }}
                        />
                    </label>
                </div>
            </div>
        </footer>
    )
}

export default Footer
