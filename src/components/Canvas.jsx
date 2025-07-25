import react, { useRef, useState, Component, useContext, useEffect, act } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { CanvasContext } from '../context/CanvasContext';
import Color from './Color.jsx';
import CanvasTab from './CanvasTab.jsx';

const generateSolidColorImage = (color, width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    return canvas.toDataURL("image/png");
};

const Canvas = () => {
    // ref / context
    const { canvas } = useContext(CanvasContext);
    const canvasRef = useRef();

    // state
    const [showColorPanel, setShowColorPanel] = useState(false);
    const [boards, setBoards] = useState([{ id: 1, data: "", bgColor: '#ffffff00', imgSrc: '#ffffff00' }]);
    const [currentBoardIndex, setCurrentBoardIndex] = useState(0);

    // toolbar
    const undoRecent = () => canvasRef.current.undo();
    const resetView = () => canvasRef.current.resetView();
    const clearAll = () => canvasRef.current.eraseAll();
    const eraseScreen = () => {
        if (window.confirm("All sketches will remove. Are you sure?")) {
            canvasRef.current.clear();
            const emptyData = canvasRef.current.getSaveData();
            setBoards(prev => {
                const next = [...prev];
                next[currentBoardIndex] = { ...next[currentBoardIndex], data: emptyData, bgColor: "#ffffff00", imgSrc: "#ffffff00" };
                return next;
            });
        } else return;
    }
    // image saving
    const handleSaveAsImage = () => {
        try {
            const drawingCanvas = canvasRef.current.canvas.drawing; // the canvas element with your drawing
            const backgroundImage = boards[currentBoardIndex].imgSrc;

            const width = canvas.width;
            const height = canvas.height;

            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = width;
            exportCanvas.height = height;

            const ctx = exportCanvas.getContext('2d');

            if (backgroundImage) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.drawImage(drawingCanvas, 0, 0);
                    const dataURL = exportCanvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = 'canvas-drawing.png';
                    link.click();
                };
                img.src = backgroundImage;
            } else {
                ctx.fillStyle = boards[currentBoardIndex].bgColor;
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(drawingCanvas, 0, 0);
                const dataURL = exportCanvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'canvas-drawing.png';
                link.click();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // tabs
    const saveCurrentBoard = () => {
        if (!canvasRef.current) return;
        const updated = [...boards];
        updated[currentBoardIndex].data = canvasRef.current.getSaveData();
        setBoards(updated);
    };

    const switchBoard = (nextIndex) => {
        if (nextIndex < 0 || nextIndex >= boards.length) return;
        saveCurrentBoard();
        setCurrentBoardIndex(nextIndex);
        // load drawing for new board once the index is set in state
        setTimeout(() => {
            const next = boards[nextIndex];
            const img = generateSolidColorImage(next.bgColor, canvas.width, canvas.height);
            if (canvasRef.current) {
                canvasRef.current.clear();
                canvasRef.current.loadSaveData(next.data || '[]', true);
                setBoards(prev => {
                    const newBoards = [...prev];
                    newBoards[nextIndex].imgSrc = img;
                    return newBoards;
                });
            }
        }, 0);
    };

    const addNewBoard = () => {
        saveCurrentBoard();
        const newBoard = { id: Date.now(), data: "[]", bgColor: '#ffffff00', imgSrc: '#ffffff00' };
        const bgImg = generateSolidColorImage('#ffffff00', canvas.width, canvas.height);
        newBoard.imgSrc = bgImg;
        setBoards([...boards, newBoard]);
        setCurrentBoardIndex(boards.length); // new index is last
        // clear canvas for new board
        setTimeout(() => canvasRef.current.clear(), 0);
    };

    const removeCurrentBoard = () => {
        if (boards.length < 1) return;
        const newBoards = boards.filter((board) =>
            board.id !== boards[currentBoardIndex].id
        );
        setBoards(newBoards);
        setCurrentBoardIndex(currentBoardIndex - 1);
    }

    const activeBoard = boards[currentBoardIndex];

    useEffect(() => {
        const img = generateSolidColorImage(activeBoard.bgColor, canvas.width, canvas.height);
        setBoards(prev => {
            const updated = [...prev];
            updated[currentBoardIndex].imgSrc = img;
            return updated;
        });
    }, [activeBoard.bgColor]);

    return (
        <div>

            <div style={{ display: "flex", gap: "25px", marginTop: "1rem" }}>

                <div style={{ position: "fixed", left: 0, display: 'flex', flexDirection: "column", alignItems: 'center', gap: '20px', padding: "0 0.4rem", }}>

                    <button style={{ border: 'none', background: 'none', cursor: "pointer" }} onClick={undoRecent}><i style={{ fontSize: '1.5rem', color: 'rgba(50, 50, 50, 0.39)' }} className="fa-solid fa-rotate-left"></i></button>
                    <button style={{ border: 'none', background: 'none', cursor: "pointer" }} onClick={clearAll}><i style={{ fontSize: '1.5rem', color: "rgba(50, 50, 50, 0.39)" }} className="fa-solid fa-eraser"></i></button>
                    <button style={{ position: "relative", background: 'none', border: "none", cursor: 'pointer' }} onClick={() => setShowColorPanel((prev) => !prev)}><i style={{ fontSize: '1.5rem', color: 'rgba(50, 50, 50, 0.39)' }} className="fa-solid fa-palette"></i></button>{showColorPanel && <Color />}

                    <input
                        type="color"
                        value={activeBoard.bgColor}
                        onChange={(e) => {
                            const newColor = e.target.value;
                            const img = generateSolidColorImage(newColor, canvas.width, canvas.height);
                            setBoards(prev => {
                                const next = [...prev];
                                next[currentBoardIndex] = { ...next[currentBoardIndex], bgColor: newColor, imgSrc: img };
                                return next;
                            });
                        }}
                        title="Background Color"
                    />

                    <button style={{ background: 'none', border: "none", color: "#000", cursor: 'pointer' }} onClick={handleSaveAsImage}><i style={{ fontSize: '1.5rem', color: 'rgba(50, 50, 50, 0.39)' }} className="fa-solid fa-download"></i></button>
                    <button style={{ background: 'none', border: "none", cursor: 'pointer' }} onClick={resetView}><i style={{ fontSize: '1.5rem', color: 'rgba(50, 50, 50, 0.39)' }} className="fa-solid fa-magnifying-glass"></i></button>
                    <button style={{ border: 'none', background: 'none', cursor: "pointer" }} onClick={eraseScreen}><i style={{ fontSize: '1.5rem', color: 'rgba(50, 50, 50, 0.39)' }} className="fa-solid fa-trash"></i></button>
                </div>

                <div style={{ marginLeft: "4.5rem", marginBottom: "1rem" }}>

                    <CanvasDraw style={{ border: '0.1mm solid rgb(132, 132, 132)', borderRadius: "2mm", marginLeft: '10px' }}
                        ref={canvasRef}
                        key={activeBoard.id + '-' + activeBoard.imgSrc}
                        imgSrc={activeBoard.imgSrc}
                        saveData={activeBoard.data || undefined}
                        brushColor={canvas.brushColor}
                        catenaryColor="rgba(43, 43, 43, 0.46)"
                        lazyRadius={canvas.lazyRadius}
                        brushRadius={canvas.brushRadius}
                        canvasWidth={canvas.width}
                        canvasHeight={canvas.height}
                        hideGrid={false}
                        immediateLoading={true}
                        enablePanAndZoom={true}
                        mouseZoomFactor={0.01}
                        zoomExtents={{ min: 0.08, max: 5 }}
                    />
                    <CanvasTab
                        pageNumber={currentBoardIndex + 1}
                        totalBoards={boards.length}
                        goPrev={() => switchBoard(currentBoardIndex - 1)}
                        goNext={() => switchBoard(currentBoardIndex + 1)}
                        addBoard={addNewBoard}
                        removeBoard={removeCurrentBoard}
                    />
                </div>

            </div>
        </div>
    )
}

export default Canvas
