import fs from 'fs'
import path from 'path'
import { NodeIO } from '@gltf-transform/core'
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions'

const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS)

const models = [
  'macbook_pro_m3_16_inch_2024.glb',
  'iphone_17_pro.glb',
  'pulldown_graph_chart_3d.glb',
  'apple_vision_pro.glb',
  'apple_watch_ultra_2.glb'
]

const NUM_POINTS = 7000

async function extractFromGLB(filename) {
  const filepath = path.join('public', 'assets', 'models', filename)
  if (!fs.existsSync(filepath)) {
    console.error('File not found:', filepath)
    return null
  }

  const document = await io.read(filepath)
  const root = document.getRoot()
  const allTriangles = []

  root.listNodes().forEach((node) => {
    const mesh = node.getMesh()
    if (!mesh) return

    const matrix = node.getWorldMatrix()
    
    mesh.listPrimitives().forEach((prim) => {
      const positionAccessor = prim.getAttribute('POSITION')
      const indicesAccessor = prim.getIndices()
      if (!positionAccessor) return

      const positions = []
      for (let i = 0; i < positionAccessor.getCount(); i++) {
        const el = []
        positionAccessor.getElement(i, el)
        const xw = matrix[0] * el[0] + matrix[4] * el[1] + matrix[8] * el[2] + matrix[12]
        // Negate Y axis to fix upside-down models in Canvas
        const yw = -(matrix[1] * el[0] + matrix[5] * el[1] + matrix[9] * el[2] + matrix[13])
        const zw = matrix[2] * el[0] + matrix[6] * el[1] + matrix[10] * el[2] + matrix[14]
        positions.push([xw, yw, zw])
      }

      if (indicesAccessor) {
        for (let i = 0; i < indicesAccessor.getCount(); i += 3) {
          const a = positions[indicesAccessor.getScalar(i)]
          const b = positions[indicesAccessor.getScalar(i+1)]
          const c = positions[indicesAccessor.getScalar(i+2)]
          if (a && b && c) {
            allTriangles.push([a, b, c])
          }
        }
      } else {
        // non-indexed triangles
        for (let i = 0; i < positions.length; i += 3) {
          const a = positions[i]
          const b = positions[i+1]
          const c = positions[i+2]
          if (a && b && c) {
            allTriangles.push([a, b, c])
          }
        }
      }
    })
  })

  if (allTriangles.length === 0) return null

  // Calculate triangle areas
  let totalArea = 0
  const areas = allTriangles.map(tri => {
    const a = tri[0], b = tri[1], c = tri[2]
    const ab = [b[0]-a[0], b[1]-a[1], b[2]-a[2]]
    const ac = [c[0]-a[0], c[1]-a[1], c[2]-a[2]]
    // Cross product
    const crossX = ab[1]*ac[2] - ab[2]*ac[1]
    const crossY = ab[2]*ac[0] - ab[0]*ac[2]
    const crossZ = ab[0]*ac[1] - ab[1]*ac[0]
    const area = 0.5 * Math.sqrt(crossX*crossX + crossY*crossY + crossZ*crossZ)
    totalArea += area
    return area
  })

  // Sample exactly NUM_POINTS evenly over surface area
  const rawSampled = []
  for (let i = 0; i < NUM_POINTS; i++) {
    // Pick triangle proportional to area
    let r = Math.random() * totalArea
    let triIdx = 0
    for (; triIdx < areas.length; triIdx++) {
      r -= areas[triIdx]
      if (r <= 0) break
    }
    triIdx = Math.min(triIdx, areas.length - 1)
    const tri = allTriangles[triIdx]

    // Random point in triangle using barycentric coordinates
    let u = Math.random()
    let v = Math.random()
    if (u + v > 1) {
      u = 1 - u
      v = 1 - v
    }
    const w = 1 - u - v
    const p = [
      tri[0][0]*u + tri[1][0]*v + tri[2][0]*w,
      tri[0][1]*u + tri[1][1]*v + tri[2][1]*w,
      tri[0][2]*u + tri[1][2]*v + tri[2][2]*w
    ]
    rawSampled.push(p)
  }

  let min = [Infinity, Infinity, Infinity]
  let max = [-Infinity, -Infinity, -Infinity]

  rawSampled.forEach(p => {
    for (let i=0; i<3; i++) {
      min[i] = Math.min(min[i], p[i])
      max[i] = Math.max(max[i], p[i])
    }
  })

  const center = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2
  ]

  let maxExtent = 0
  for (let i=0; i<3; i++) {
    maxExtent = Math.max(maxExtent, max[i] - min[i])
  }

  // Increased scale from 200 to 280 to make models larger
  const scale = 280 / maxExtent

  const normalized = rawSampled.map(p => [
    (p[0] - center[0]) * scale,
    (p[1] - center[1]) * scale,
    (p[2] - center[2]) * scale
  ])

  return normalized
}

async function run() {
  const result = {}
  for (const m of models) {
    console.log('Extracting', m)
    const pts = await extractFromGLB(m)
    if (pts) {
      result[m.replace('.glb', '')] = pts
    }
  }

  fs.writeFileSync(
    path.join('public', 'assets', 'models', 'points.json'),
    JSON.stringify(result)
  )
  console.log('Wrote points.json')
}

run()
