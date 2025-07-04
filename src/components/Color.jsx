import React, { useContext } from 'react'
import { CanvasContext } from '../context/CanvasContext';
import "../index.css";


const Color = () => {

    const { canvas, updateCanvas } = useContext(CanvasContext);


    const brushColors = ["red", "orange", "blue", "yellow", "cyan", "pink", "green", "limeGreen", "aqua", "maroon", "skyBlue", "white", "brown", "black", "gray", "violet"];
    const style = {
        width: "20px",
        height: "20px",
        border: "0.1mm solid black",
        margin: "5px",
        cursor: "pointer",
        content: "",
    }

    return (
        <div style={{ zIndex: "9999", background: "rgb(255, 255, 255)", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.49)", borderRadius: "2mm", position: "absolute", top: "10px", left: "44px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridTemplateRows: "auto auto", padding: "00.4rem" }}>
                <div>
                    {/* <p style={{ paddingBottom: "1rem" }}>Brush Colors</p> */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 35px)", gridTemplateRows: "auto", justifyItems: "center" }} >
                        {
                            brushColors.map((color, index) => (
                                <span key={index} onClick={() => updateCanvas({ brushColor: color })} style={{ ...style, backgroundColor: color, cursor: "pointer" }}></span>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Color
