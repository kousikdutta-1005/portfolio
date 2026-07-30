import { NodeIO } from '@gltf-transform/core'
const io = new NodeIO()
const doc = await io.read('public/assets/models/macbook_pro_m3_16_inch_2024.glb')
console.log(typeof doc.getRoot)
