import rough from 'roughjs/bundled/rough.esm'
const generator = rough.generator()

let dotTurnPattern = []

// top line of dots
for (let i = 0; i < 3; i++) {
    const x = 200 + 150 * i
    const y = 200
    const d = 60
    let circle = generator.circle(x, y, d, { roughness: 0, fill: 'red' })
    let circleObj = { centerX: x, centerY: y, diameter: d, roughElement: circle }
    dotTurnPattern.push(circleObj)
}

let c1 = generator.circle(200, 500, 60, { roughness: 0, fill: 'red' })
let c2 = generator.circle(350, 350, 60, { roughness: 0, fill: 'red' })

dotTurnPattern.push({ centerX: 200, centerY: 500, diameter: 60, roughElement: c1 })
dotTurnPattern.push({ centerX: 350, centerY: 350, diameter: 60, roughElement: c2 })


export default { pattern: dotTurnPattern, length: 2 }