import React from "react";
import rough from 'roughjs/bundled/rough.esm'
import './NineDots.css';
import { useHooks, useLayoutEffect } from "use-react-hooks";

const PeerLines = useHooks(props => {
    const lines = props.lines


    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const roughCanvas = rough.canvas(canvas)
        lines.forEach(({ roughElement }) => roughCanvas.draw(roughElement), [lines])
    })

    return (
        <div className="container" >
            <canvas
                id="canvas"
                width={700}
                height={700}
            >
            </canvas>
        </div >
    );
})

export default PeerLines;
