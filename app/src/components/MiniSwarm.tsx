import { useEffect, useRef, useState } from "react"

export function MiniSwarm({ modelName }: { modelName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points, setPoints] = useState<number[][] | null>(null)

  useEffect(() => {
    fetch('/assets/models/points.json')
      .then(r => r.json())
      .then(data => {
        if (data[modelName]) {
          // Subset points for performance: 1500 points is plenty for a 60px icon
          const allPoints = data[modelName]
          const subset = []
          const step = Math.max(1, Math.floor(allPoints.length / 1500))
          for (let i = 0; i < allPoints.length; i += step) {
             subset.push(allPoints[i])
          }
          setPoints(subset)
        }
      })
      .catch(e => console.error('Failed to load points for mini swarm:', e))
  }, [modelName])

  useEffect(() => {
    if (!points) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let time = 0
    const width = 80
    const height = 80
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")
      const color = isDark ? "rgba(167, 139, 250, 0.4)" : "rgba(124, 58, 237, 0.5)"

      const centerX = width / 2
      const centerY = height / 2
      const fov = 150

      const cosY = Math.cos(time)
      const sinY = Math.sin(time)
      const cosZ = Math.cos(Math.PI / 4)
      const sinZ = Math.sin(Math.PI / 4)
      
      const scaleBase = 0.22

      ctx.beginPath()
      ctx.fillStyle = color

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        
        let rx = p[0] * scaleBase
        let ry = p[1] * scaleBase
        let rz = p[2] * scaleBase

        // Y rotation
        let tx = rx * cosY - rz * sinY
        let tz = rx * sinY + rz * cosY
        rx = tx
        rz = tz

        // Z tilt
        let fx = rx * cosZ - ry * sinZ
        let fy = rx * sinZ + ry * cosZ
        rx = fx
        ry = fy

        const scale = fov / (fov + rz + 100)
        const px = rx * scale + centerX
        const py = ry * scale + centerY

        ctx.moveTo(px, py)
        ctx.arc(px, py, 0.8, 0, Math.PI * 2)
      }
      ctx.fill()

      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => cancelAnimationFrame(animationFrameId)
  }, [points])

  return (
    <canvas 
      ref={canvasRef}
      style={{ width: "80px", height: "80px" }}
      aria-hidden="true"
    />
  )
}
