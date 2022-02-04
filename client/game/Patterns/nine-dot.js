import rough from 'roughjs/bundled/rough.esm'
const generator = rough.generator()

let nineDotPattern = []
// initialize set of 9 dots in red
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const x = 200 + 150 * i
        const y = 200 + 150 * j
        const d = 60
        let circle = generator.circle(x, y, d, { roughness: 0, fill: 'red' })
        let circleObj = { centerX: x, centerY: y, diameter: d, roughElement: circle }
        nineDotPattern.push(circleObj)
    }
}

export default { pattern: nineDotPattern, length: 4 }