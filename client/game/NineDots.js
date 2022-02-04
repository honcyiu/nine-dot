import React from "react";
import rough from 'roughjs/bundled/rough.esm'
import './NineDots.css';
import { useHooks, useState, useLayoutEffect } from "use-react-hooks";

const generator = rough.generator()
// function to create a line object
function createLine(x1, y1, x2, y2) {
    const roughElement = generator.line(x1, y1, x2, y2)
    return { x1, y1, x2, y2, roughElement }
}

// function to check if any given two lines intersect each other
function intersects(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

// function to check if there are any collisons between dot and lines drawn
function collision(circle, line) {
    const radius = circle.diameter * 0.5
    const l1 = [circle.centerX - radius * 0.8, circle.centerY + radius * 0.8, circle.centerX + radius * 0.8, circle.centerY + radius * 0.8]
    const l2 = [circle.centerX - radius * 0.8, circle.centerY + radius * 0.8, circle.centerX - radius * 0.8, circle.centerY - radius * 0.8]
    const l3 = [circle.centerX + radius * 0.8, circle.centerY + radius * 0.8, circle.centerX + radius * 0.8, circle.centerY - radius * 0.8]
    const l4 = [circle.centerX - radius * 0.8, circle.centerY - radius * 0.8, circle.centerX + radius * 0.8, circle.centerY - radius * 0.8]
    const area = [l1, l2, l3, l4]
    for (let i = 0; i < 4; i++) {
        const cLine = area[i];
        if (intersects(cLine[0], cLine[1], cLine[2], cLine[3], line.x1, line.y1, line.x2, line.y2)) {
            return true;
        }
    }
    return false;
}

const NineDots = useHooks(props => {
    let circleSet = []
    // initialize set of 9 dots in red
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const x = 200 + 150 * i
            const y = 200 + 150 * j
            const d = 60
            let circle = generator.circle(x, y, d, { roughness: 0, fill: 'red' })
            let circleObj = { centerX: x, centerY: y, diameter: d, roughElement: circle }
            circleSet.push(circleObj)
        }
    }

    // function to create 9 dots
    function createCircles(circles, lines) {
        // record number of green dots
        let hits = 0
        // render set of 9 dots
        for (let i = 0; i < circles.length; i++) {
            if (lines.length > 0) {
                for (let l = 0; l < lines.length; l++) {
                    console.log(circles)
                    // if a dot collides with any drawn line, make the dot green
                    if (collision(circles[i], lines[l])) {
                        console.log("cross")
                        circles[i].roughElement.options.fill = "green"
                        hits++;
                        break
                    }
                    circles[i].roughElement.options.fill = "red"
                }
            }
            else { circles[i].roughElement.options.fill = "red" }
        }
        if (hits == circles.length) { setComplete(1) }
        return circles
    }

    // react hooks to set relevants states
    const [circles, setCircles] = useState(circleSet)
    const [lines, setLines] = useState([])
    const [drawing, setDrawing] = useState(false)
    const [first, setFirst] = useState(true)
    const [start, setStart] = useState([0, 0])
    const [length, setLength] = useState(4)
    const [complete, setComplete] = useState(0)

    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const roughCanvas = rough.canvas(canvas)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // render lines and set of 9 dots
        lines.forEach(({ roughElement }) => roughCanvas.draw(roughElement), [lines])
        circles.forEach(({ roughElement }) => roughCanvas.draw(roughElement))
    })

    const handleMouseDown = (e) => {
        if (length <= 0) {
            return
        }
        setLength(length - 1)
        setDrawing(true)
        clientX = e.clientX - e.target.offsetLeft
        clientY = e.clientY - e.target.offsetTop
        let line = createLine(clientX, clientY, clientX, clientY)
        if (first == false) {
            line = createLine(start[0], start[1], clientX, clientY)
        }
        else {
            setFirst(false)
        }
        setLines(prevState => [...prevState, line])
    }
    const handleMouseMove = (e) => {
        if (!drawing) return
        clientX = e.clientX - e.target.offsetLeft
        clientY = e.clientY - e.target.offsetTop
        const index = lines.length - 1
        const { x1, y1 } = lines[index]
        const updatedLine = createLine(x1, y1, clientX, clientY)
        const linesCopy = [...lines]
        linesCopy[index] = updatedLine
        setStart([clientX, clientY])
        setLines(linesCopy)
        const updateCircles = createCircles(circleSet, lines)
        setCircles(updateCircles)
    }
    const handleMouseUp = () => {
        setDrawing(false)
    }

    const restartGame = () => {
        const updateCircles = createCircles(circleSet, [])
        setCircles(updateCircles)
        setLines([])
        setLength(4)
        setFirst(true)
    }

    // upon "submit", send results back to class response component
    const submitResult = (e) => {
        const results = { complete: complete, lines: lines }
        props.parentCallback(results);
        e.preventDefault();
    }

    return (
        <div className="container" >
            <canvas
                id="canvas"
                width={700}
                height={700}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}>
            </canvas>
            <button type="button" onClick={restartGame}>Restart</button>
            <button type="button" onClick={submitResult}>Done!</button>
        </div >
    );
})

export default NineDots;
