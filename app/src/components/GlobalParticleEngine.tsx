import { useEffect, useRef, useState } from "react"
import { useReducedMotion, useScroll, useSpring } from "framer-motion"

export function GlobalParticleEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion() === true
  const { scrollYProgress } = useScroll()
  
  // Create a buttery smooth spring for the scroll value to prevent sudden jumps
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 0.5,
    restDelta: 0.001
  })

  const [modelPoints, setModelPoints] = useState<Record<string, number[][]> | null>(null)

  useEffect(() => {
    fetch('/assets/models/points.json')
      .then(r => r.json())
      .then(data => {
        // Generate a 3D swarm sphere programmatically for the initial state
        const spherePoints = []
        const NUM_POINTS = 35000
        const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle
        for (let i = 0; i < NUM_POINTS; i++) {
            const y = 1 - (i / (NUM_POINTS - 1)) * 2
            const r = Math.sqrt(1 - y * y)
            const theta = phi * i
            // Base radius 120 so it feels appropriately sized compared to CAD models
            spherePoints.push([Math.cos(theta) * r * 120, y * 120, Math.sin(theta) * r * 120])
        }
        data['swarm_sphere'] = spherePoints
        setModelPoints(data)
      })
      .catch(e => console.error('Failed to load points:', e))
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !modelPoints) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight
    let time = 0
    let scrollProgress = 0

    const unsubscribe = smoothScroll.on("change", (v) => {
      scrollProgress = v
    })

    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const NUM_PARTICLES = 35000
    const particles: any[] = []

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: (Math.random() - 0.5) * 800,
        vx: 0,
        vy: 0,
        vz: 0,
        r1: Math.random(),
        r2: Math.random(),
        r3: Math.random(),
        offset: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.008,
      })
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      updateTargets()
    }
    
    let pageTargets: any[] = []
    const updateTargets = () => {
      const els = Array.from(document.querySelectorAll('.waypoint-3d'))
      pageTargets = els.map(el => {
        const rect = el.getBoundingClientRect()
        const absoluteTop = rect.top + window.scrollY
        const absoluteCenter = absoluteTop + rect.height / 2
        return {
          model: el.getAttribute('data-model') || 'apple_vision_pro',
          xDesktop: parseFloat(el.getAttribute('data-x-desktop') || '0.85'),
          yDesktop: parseFloat(el.getAttribute('data-y-desktop') || '0.3'),
          xMobile: parseFloat(el.getAttribute('data-x-mobile') || '0.5'),
          yMobile: parseFloat(el.getAttribute('data-y-mobile') || '0.15'),
          zDepth: parseFloat(el.getAttribute('data-z-depth') || '0'), // Z-depth scale control
          top: absoluteTop,
          center: absoluteCenter,
          height: rect.height
        }
      }).sort((a, b) => a.center - b.center)
    }
    
    window.addEventListener("resize", resize)
    resize()
    
    // Periodically re-check targets in case of dynamic routing or lazy loading
    const intervalId = setInterval(updateTargets, 1000)

    const render = () => {
      time += 1
      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")

      // Read accent color from root CSS variable (set by route-accent classes)
      const rootStyle = getComputedStyle(document.body)
      const accentCssVar = rootStyle.getPropertyValue('--color-accent').trim()
      
      // If we don't have a valid hex from CSS, fallback to the default purple
      let accentRgb = isDark ? "167, 139, 250" : "124, 58, 237"
      if (accentCssVar && accentCssVar.startsWith('#')) {
        // Convert hex to rgb string for canvas
        const r = parseInt(accentCssVar.slice(1, 3), 16)
        const g = parseInt(accentCssVar.slice(3, 5), 16)
        const b = parseInt(accentCssVar.slice(5, 7), 16)
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
           accentRgb = `${r}, ${g}, ${b}`
        }
      }
      
      const fov = 450
      const isMobile = width < 768

      const shapeSequence = [
        'swarm_sphere',
        'macbook_pro_m3_16_inch_2024',
        'iphone_17_pro',
        'pulldown_graph_chart_3d',
        'apple_vision_pro',
        'apple_watch_ultra_2'
      ]
      
      const mappedScroll = Math.max(0, Math.min(1, scrollProgress)) * (shapeSequence.length - 1)
      const currentShapeIdx = Math.floor(mappedScroll)
      const nextShapeIdx = Math.min(currentShapeIdx + 1, shapeSequence.length - 1)
      const shapeTransitionProgress = mappedScroll - currentShapeIdx

      const currentModel = shapeSequence[currentShapeIdx]
      const nextModel = shapeSequence[nextShapeIdx]

      // Determine center position (waypoint tracking)
      let centerX = width * 0.5
      let centerY = height * 0.5
      let baseZDepth = 0
      let posTransitionProgress = 0

      if (pageTargets.length > 0) {
        // Track the center of the viewport
        const scrollCenter = window.scrollY + height / 2

        let nextIdx = pageTargets.findIndex(t => t.center >= scrollCenter)
        if (nextIdx === -1) nextIdx = pageTargets.length - 1
        let prevIdx = nextIdx > 0 ? nextIdx - 1 : 0
        if (nextIdx === 0) prevIdx = 0

        const tPrev = pageTargets[prevIdx]
        const tNext = pageTargets[nextIdx]

        let dist = tNext.center - tPrev.center
        if (dist > 0) {
           posTransitionProgress = Math.max(0, Math.min(1, (scrollCenter - tPrev.center) / dist))
        }

        const px1 = isMobile ? tPrev.xMobile : tPrev.xDesktop
        const py1 = isMobile ? tPrev.yMobile : tPrev.yDesktop
        const px2 = isMobile ? tNext.xMobile : tNext.xDesktop
        const py2 = isMobile ? tNext.yMobile : tNext.yDesktop

        const z1 = tPrev.zDepth
        const z2 = tNext.zDepth

        const easedP = posTransitionProgress > 0 ? (1 - Math.cos(posTransitionProgress * Math.PI)) / 2 : 0

        centerX = width * (px1 * (1 - easedP) + px2 * easedP)
        centerY = height * (py1 * (1 - easedP) + py2 * easedP)
        baseZDepth = z1 * (1 - easedP) + z2 * easedP
      }

      // Rotate purely based on scroll progress (dynamic and awesome looking)
      const globalRotateY = scrollProgress * Math.PI * 2.5 // 1.25 full rotations over the page length (elegant pace)
      const globalRotateX = 0.15 + Math.sin(scrollProgress * Math.PI * 2) * 0.15
      
      // 25 degree tilt on Z axis (reduced from 45 so objects are more upright and recognizable)
      const globalRotateZ = Math.PI / 7 

      const cosY = Math.cos(globalRotateY)
      const sinY = Math.sin(globalRotateY)
      const cosX = Math.cos(globalRotateX)
      const sinX = Math.sin(globalRotateX)
      const cosZ = Math.cos(globalRotateZ)
      const sinZ = Math.sin(globalRotateZ)

      const repelRadius = 180
      const MODEL_SCALE = 1.4 // Make models significantly bigger

      const renderList = []

      // Cache current and next point arrays
      const currentShapePoints = modelPoints[currentModel]
      const nextShapePoints = modelPoints[nextModel]

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        let targetX = 0, targetY = 0, targetZ = 0
        
        if (currentShapePoints && currentShapePoints[i]) {
            targetX = currentShapePoints[i][0] * MODEL_SCALE
            targetY = currentShapePoints[i][1] * MODEL_SCALE
            targetZ = currentShapePoints[i][2] * MODEL_SCALE
        }
        
        if (shapeTransitionProgress > 0 && currentModel !== nextModel && nextShapePoints && nextShapePoints[i]) {
           const nextX = nextShapePoints[i][0] * MODEL_SCALE
           const nextY = nextShapePoints[i][1] * MODEL_SCALE
           const nextZ = nextShapePoints[i][2] * MODEL_SCALE
           
           const shapeEase = shapeTransitionProgress > 0.4 ? 1 : Math.pow(shapeTransitionProgress * 2.5, 3)
           
           targetX = targetX * (1 - shapeEase) + nextX * shapeEase
           targetY = targetY * (1 - shapeEase) + nextY * shapeEase
           targetZ = targetZ * (1 - shapeEase) + nextZ * shapeEase
        }

        // Breathing creature effect (living, shape-shifting)
        // We inject organic sine wave distortion so the edges of the shape warp slightly like a living organism
        // Kept subtle so the underlying CAD model remains highly recognizable
        const breathAmplitude = 1.2
        const organicWarp = Math.sin(time * p.speed + p.offset) * Math.cos(time * p.speed * 0.8 + p.offset)
        targetX += organicWarp * breathAmplitude
        targetY += Math.cos(time * p.speed * 0.9 + p.offset) * breathAmplitude
        targetZ += Math.sin(time * p.speed * 1.1 + p.offset) * breathAmplitude

        // Spring physics
        p.vx += (targetX - p.x) * 0.08 // softer spring
        p.vy += (targetY - p.y) * 0.08
        p.vz += (targetZ - p.z) * 0.08
        
        p.vx *= 0.72 // slightly lower friction = looser, more fluid organic shapes
        p.vy *= 0.72
        p.vz *= 0.72

        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        // Note: protect from NaN
        p.x = p.x || 0; p.y = p.y || 0; p.z = p.z || 0

        // Apply global 3D rotation
        let rx = p.x * cosY - p.z * sinY
        let rz = p.x * sinY + p.z * cosY
        let ry = p.y * cosX - rz * sinX
        rz = p.y * sinX + rz * cosX
        
        // Z-axis tilt
        let finalRx = rx * cosZ - ry * sinZ
        let finalRy = rx * sinZ + ry * cosZ
        rx = finalRx
        ry = finalRy

        // Apply depth translation (moves the object physically closer or further from the camera)
        rz += baseZDepth

        // 3D to 2D projection
        // Use a dynamic FOV calculation so the model scales naturally as rz changes
        const scale = fov / Math.max(10, (fov + rz + 200))
        let px = rx * scale + centerX
        let py = ry * scale + centerY

        // Mouse repel
        const dx = px - mouseX
        const dy = py - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < repelRadius) {
          const force = Math.pow((repelRadius - dist) / repelRadius, 2)
          px += (dx / dist) * force * 4 * scale * 15
          py += (dy / dist) * force * 4 * scale * 15
        }

        renderList.push({ px, py, rz, scale, index: i })
      }

      // Sort back-to-front (Z-buffer)
      renderList.sort((a, b) => b.rz - a.rz)

      // Use normal blending to match matte background material
      ctx.globalCompositeOperation = "source-over"
      
      // OPTIMIZATION: Instead of 35,000 individual stroke() calls per frame (which destroys CPU),
      // we batch the lines into 3 depth/opacity buckets and stroke them just 3 times.
      const pathForeground = new Path2D()
      const pathMidground = new Path2D()
      const pathBackground = new Path2D()
      
      const colorBase = accentRgb

      for (let i = 0; i < renderList.length; i++) {
        const item = renderList[i]
        
        let targetPath = pathForeground
        if (item.rz > 60) targetPath = pathBackground
        else if (item.rz > 15) targetPath = pathMidground

        const length = Math.max(0.6, item.scale * 1.2) // Extremely short threads for ultra-fine sub-pixel detail
        // Create a woven/crosshatch pattern using particle index
        const angle = (item.index % 2 === 0) ? Math.PI / 4 : -Math.PI / 4
        const dx = Math.cos(angle) * length
        const dy = Math.sin(angle) * length

        targetPath.moveTo(item.px - dx, item.py - dy)
        targetPath.lineTo(item.px + dx, item.py + dy)
      }

      // Draw Background Bucket
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${colorBase}, 0.04)`
      ctx.lineWidth = 0.3
      ctx.stroke(pathBackground)

      // Draw Midground Bucket
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${colorBase}, 0.08)`
      ctx.lineWidth = 0.4
      ctx.stroke(pathMidground)

      // Draw Foreground Bucket
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${colorBase}, 0.15)`
      ctx.lineWidth = 0.6
      ctx.stroke(pathForeground)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervalId)
      unsubscribe()
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [prefersReducedMotion, smoothScroll, modelPoints])

  if (prefersReducedMotion) return null

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ width: "100%", height: "100%", opacity: 0.9, transition: "opacity 0.5s ease" }}
      aria-hidden="true"
    />
  )
}
