import { useEffect, useRef } from 'react'

export default function KoiFish() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false })
  const koiRef = useRef({
    x: 0,
    y: 0,
    angle: 0,
    speed: 0,
    tailAngle: 0,
    targetX: 0,
    targetY: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    // 设置画布大小为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // 初始化锦鲤位置到中心
      koiRef.current.x = canvas.width / 2
      koiRef.current.y = canvas.height / 2
      koiRef.current.targetX = canvas.width / 2
      koiRef.current.targetY = canvas.height / 2
    }
    resizeCanvas()

    // 处理鼠标移动
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isMoving: true,
      }
      koiRef.current.targetX = e.clientX
      koiRef.current.targetY = e.clientY
    }

    // 处理鼠标离开
    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false
    }

    // 添加事件监听
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // 绘制水波纹效果
    function drawRipple(x: number, y: number, radius: number, opacity: number) {
      ctx.beginPath()
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.lineWidth = 2
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 绘制锦鲤
    function drawKoi(x: number, y: number, angle: number, tailAngle: number) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      // 身体渐变
      const gradient = ctx.createLinearGradient(-50, 0, 0, 0)
      gradient.addColorStop(0, '#FF3B30')
      gradient.addColorStop(1, '#FF6B66')

      // 身体
      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-10, -20, -40, -20, -50, 0)
      ctx.bezierCurveTo(-40, 20, -10, 20, 0, 0)
      ctx.fill()

      // 尾巴
      ctx.save()
      ctx.translate(-50, 0)
      ctx.rotate(tailAngle)
      ctx.beginPath()
      ctx.fillStyle = '#FF3B30'
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-20, -15, -40, -10, -30, 0)
      ctx.bezierCurveTo(-40, 10, -20, 15, 0, 0)
      ctx.fill()
      ctx.restore()

      // 鱼鳍
      ctx.beginPath()
      ctx.fillStyle = '#FF3B30'
      ctx.moveTo(-20, 0)
      ctx.bezierCurveTo(-25, -10, -35, -10, -30, 0)
      ctx.bezierCurveTo(-35, 10, -25, 10, -20, 0)
      ctx.fill()

      // 眼睛
      ctx.beginPath()
      ctx.fillStyle = '#000'
      ctx.arc(-5, -3, 2, 0, Math.PI * 2)
      ctx.fill()

      // 添加光泽效果
      ctx.beginPath()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.ellipse(-15, -5, 15, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // 动画循环
    function animate() {
      // 清除画布
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const koi = koiRef.current
      const mouse = mouseRef.current

      // 计算到目标点的距离和角度
      const dx = koi.targetX - koi.x
      const dy = koi.targetY - koi.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const targetAngle = Math.atan2(dy, dx)

      // 平滑角度转向
      let angleDiff = targetAngle - koi.angle
      if (angleDiff > Math.PI) angleDiff -= Math.PI * 2
      if (angleDiff < -Math.PI) angleDiff += Math.PI * 2
      koi.angle += angleDiff * 0.1

      // 根据距离调整速度
      const targetSpeed = Math.min(12, distance / 10)
      koi.speed += (targetSpeed - koi.speed) * 0.1

      // 更新位置
      koi.x += Math.cos(koi.angle) * koi.speed
      koi.y += Math.sin(koi.angle) * koi.speed

      // 更新尾巴摆动
      const tailSpeed = 0.15 // 尾巴摆动速度
      const tailAmplitude = 0.5 // 尾巴摆动幅度
      koi.tailAngle = Math.sin(Date.now() * tailSpeed) * tailAmplitude * (koi.speed / 5 + 0.5)

      // 如果鼠标移动，绘制水波纹效果
      if (mouse.isMoving && distance > 5) {
        drawRipple(mouse.x, mouse.y, 20, 0.2)
        drawRipple(mouse.x, mouse.y, 30, 0.1)
      }

      // 绘制锦鲤
      drawKoi(koi.x, koi.y, koi.angle, koi.tailAngle)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black cursor-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
