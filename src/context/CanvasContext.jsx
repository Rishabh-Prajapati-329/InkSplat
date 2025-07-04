import React, { createContext, useState } from 'react';

export const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {

    const getInitialSize = () => {
        try {

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const width = screenWidth - 100;
            const height = screenHeight - 160;

            return { width: Math.floor(width), height: Math.floor(height) };

        } catch (error) {
            console.log(error);
        }
    };


    const [canvas, setCanvas] = useState({
        ...getInitialSize(),
        brushRadius: 2,
        lazyRadius: 0,
        brushColor: "",
    });

    const updateCanvas = (new_) => {
        setCanvas((prev) => ({
            ...prev,
            ...new_,
        }));
    }

    const value = {
        canvas,
        updateCanvas,
    };

    return (
        <CanvasContext.Provider value={value}>
            {children}
        </CanvasContext.Provider>
    )
};