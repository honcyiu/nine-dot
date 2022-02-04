import rough from 'roughjs/bundled/rough.esm'
const generator = rough.generator()

let nonDotTurnPattern = []
// initialize set of 9 dots in red
let c1 = generator.circle(500, 200, 60, { roughness: 0, fill: 'red' })
let c2 = generator.circle(500, 350, 60, { roughness: 0, fill: 'red' })
let c3 = generator.circle(200, 500, 60, { roughness: 0, fill: 'red' })
let c4 = generator.circle(350, 500, 60, { roughness: 0, fill: 'red' })

nonDotTurnPattern.push({ centerX: 500, centerY: 200, diameter: 60, roughElement: c1 })
nonDotTurnPattern.push({ centerX: 500, centerY: 350, diameter: 60, roughElement: c2 })
nonDotTurnPattern.push({ centerX: 200, centerY: 500, diameter: 60, roughElement: c3 })
nonDotTurnPattern.push({ centerX: 350, centerY: 500, diameter: 60, roughElement: c4 })


export default { pattern: nonDotTurnPattern, length: 2 }