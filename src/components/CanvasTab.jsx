import React, { useState } from 'react'

const CanvasTab = ({ pageNumber, totalBoards, goPrev, goNext, addBoard, removeBoard }) => {


    return (
        <div style={{ position: "absolute", bottom: 70, left: 88, background: "rgb(225, 223, 223)", borderRadius: "4mm", padding: "0.4rem 0.7rem" }}>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center", alignItems: "center" }}>
                <button onClick={goPrev} disabled={pageNumber === 1} style={{ cursor: "pointer", color: "#A6A6A6", border: "none", background: "none" }}><i style={{ fontSize: "1.3rem" }} className="fa-regular fa-square-caret-left"></i></button>
                <span style={{ color: "#A6A6A6" }}>
                    Board <span style={{ fontFamily: "arial", color: "red" }}>{pageNumber}</span> of {totalBoards}
                </span>
                <button onClick={goNext} disabled={pageNumber === totalBoards} style={{ cursor: "pointer", color: "#A6A6A6", border: "none", background: "none" }}><i style={{ fontSize: "1.3rem" }} className="fa-regular fa-square-caret-right"></i></button>
                <button style={{ ...navBtn, fontSize: "1.2rem", color: "#3a45e4" }} onClick={addBoard} title="New board">
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button style={{ ...navBtn, fontSize: "1.2rem", color: "red" }} onClick={removeBoard} disabled={pageNumber === 1} title="New board">
                    <i className="fa-solid fa-multiply"></i>
                </button>
            </div>

        </div>
    )
}
const navBtn = { cursor: "pointer", border: "none", background: "none" };
const navIcon = { fontSize: "1.3rem" };


export default CanvasTab;
