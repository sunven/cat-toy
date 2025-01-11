import { useEffect, useRef } from 'react'

const CanvasMouse = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({
    x: 100,
    y: 100,
    targetX: 100,
    targetY: 100,
    rotation: 0,
    tailWag: 0,
    isMoving: false,
  })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let frameCount = 0

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Draw mouse function
    const drawMouse = (ctx, x, y, rotation, tailWag, isMoving) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Body shadow
      ctx.shadowColor = '#fff'
      ctx.shadowBlur = 15
      ctx.shadowOffsetY = 5

      // Body
      ctx.beginPath()
      ctx.ellipse(0, 0, 30, 20, 0, 0, Math.PI * 2)
      ctx.fillStyle = '#667788'
      ctx.fill()

      // Head
      ctx.beginPath()
      ctx.ellipse(25, -5, 20, 18, 0, 0, Math.PI * 2)
      ctx.fill()

      // Ears
      ctx.shadowBlur = 5
      // Left ear
      ctx.beginPath()
      ctx.ellipse(15, -20, 12, 15, -Math.PI / 6, 0, Math.PI * 2)
      ctx.fillStyle = '#556677'
      ctx.fill()

      // Right ear
      ctx.beginPath()
      ctx.ellipse(35, -20, 12, 15, Math.PI / 6, 0, Math.PI * 2)
      ctx.fill()

      // Inner ears
      ctx.shadowBlur = 0
      ctx.beginPath()
      ctx.ellipse(15, -20, 8, 10, -Math.PI / 6, 0, Math.PI * 2)
      ctx.fillStyle = '#ffb6c1'
      ctx.fill()

      ctx.beginPath()
      ctx.ellipse(35, -20, 8, 10, Math.PI / 6, 0, Math.PI * 2)
      ctx.fill()

      // Eyes
      const blinkFrequency = Math.sin(frameCount / 50) > 0.95
      if (!blinkFrequency) {
        ctx.beginPath()
        ctx.arc(20, -8, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#000'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(40, -8, 4, 0, Math.PI * 2)
        ctx.fill()

        // Eye shine
        ctx.beginPath()
        ctx.arc(22, -10, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(42, -10, 1.5, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.moveTo(16, -8)
        ctx.lineTo(24, -8)
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(36, -8)
        ctx.lineTo(44, -8)
        ctx.stroke()
      }

      // Nose
      ctx.beginPath()
      ctx.ellipse(45, -3, 5, 3, 0, 0, Math.PI * 2)
      ctx.fillStyle = '#ff9ecd'
      ctx.fill()

      // Whiskers
      ctx.strokeStyle = '#99aabb'
      ctx.lineWidth = 1

      // Left whiskers
      for (let i = -1; i <= 1; i++) {
        const wiggle = isMoving ? Math.sin(frameCount * 0.2) * 2 : 0
        ctx.beginPath()
        ctx.moveTo(35, -3 + i * 2)
        ctx.lineTo(65, -8 + i * 4 + wiggle)
        ctx.stroke()
      }

      // Right whiskers
      for (let i = -1; i <= 1; i++) {
        const wiggle = isMoving ? Math.sin(frameCount * 0.2 + Math.PI) * 2 : 0
        ctx.beginPath()
        ctx.moveTo(35, -3 + i * 2)
        ctx.lineTo(65, i * 4 + wiggle)
        ctx.stroke()
      }

      // Tail
      ctx.beginPath()
      const tailStart = -25
      const tailControl1 = -45 + Math.sin(tailWag) * (isMoving ? 15 : 5)
      const tailControl2 = -65 + Math.cos(tailWag) * (isMoving ? 10 : 3)
      ctx.moveTo(tailStart, 0)
      ctx.bezierCurveTo(tailControl1, isMoving ? -10 : 0, tailControl2, isMoving ? 0 : 10, -75, isMoving ? 10 : 15)
      ctx.strokeStyle = '#667788'
      ctx.lineWidth = 8
      ctx.lineCap = 'round'
      ctx.stroke()

      // Feet
      if (isMoving) {
        const bounce = Math.sin(frameCount * 0.2) * 3
        ctx.beginPath()
        ctx.ellipse(-15, 15 + bounce, 10, 6, 0, 0, Math.PI * 2)
        ctx.fillStyle = '#556677'
        ctx.fill()

        ctx.beginPath()
        ctx.ellipse(15, 15 - bounce, 10, 6, 0, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.ellipse(-15, 15, 10, 6, 0, 0, Math.PI * 2)
        ctx.fillStyle = '#556677'
        ctx.fill()

        ctx.beginPath()
        ctx.ellipse(15, 15, 10, 6, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      frameCount++
      const mouse = mouseRef.current

      // Clear canvas
      ctx.fillStyle = '#1e293b'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update mouse position
      const dx = mouse.targetX - mouse.x
      const dy = mouse.targetY - mouse.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 5) {
        mouse.isMoving = false
        if (frameCount % 150 === 0) {
          mouse.targetX = Math.random() * (canvas.width - 200) + 100
          mouse.targetY = Math.random() * (canvas.height - 200) + 100
        }
      } else {
        mouse.isMoving = true
        const speed = 5
        const ratio = speed / distance
        mouse.x += dx * ratio
        mouse.y += dy * ratio

        // Update rotation
        const targetRotation = Math.atan2(dy, dx)
        const rotationDiff = targetRotation - mouse.rotation
        mouse.rotation += rotationDiff * 0.1
      }

      // Update tail animation
      mouse.tailWag += 0.1

      // Draw mouse
      drawMouse(ctx, mouse.x, mouse.y, mouse.rotation, mouse.tailWag, mouse.isMoving)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-slate-900" style={{ display: 'block' }} />
}

export default CanvasMouse
