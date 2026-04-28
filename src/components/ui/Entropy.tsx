'use client'
import { useEffect, useRef } from 'react'

export function Entropy({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const parent: HTMLElement = canvas.parentElement as HTMLElement
    if (!parent) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const dpr = window.devicePixelRatio || 1
    const COLOR = '#ffffff'

    let W = 0, H = 0, animId = 0, time = 0

    type P = {
      x: number; y: number; ox: number; oy: number; size: number
      ordered: boolean; vx: number; vy: number; influence: number; neighbors: P[]
      update(): void; draw(): void
    }

    function makeP(x: number, y: number, ordered: boolean): P {
      const p: P = {
        x, y, ox: x, oy: y, size: 1.5, ordered,
        vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
        influence: 0, neighbors: [],
        update() {
          if (p.ordered) {
            let cx = 0, cy = 0
            for (const n of p.neighbors) {
              if (!n.ordered) {
                const s = Math.max(0, 1 - Math.hypot(p.x - n.x, p.y - n.y) / 100)
                cx += n.vx * s; cy += n.vy * s
                p.influence = Math.max(p.influence, s)
              }
            }
            const inf = p.influence
            p.x += (p.ox - p.x) * 0.05 * (1 - inf) + cx * inf
            p.y += (p.oy - p.y) * 0.05 * (1 - inf) + cy * inf
            p.influence *= 0.99
          } else {
            p.vx = (p.vx + (Math.random() - 0.5) * 0.5) * 0.95
            p.vy = (p.vy + (Math.random() - 0.5) * 0.5) * 0.95
            p.x += p.vx; p.y += p.vy
            const mid = W / 2
            if (p.x < mid || p.x > W) { p.vx *= -1; p.x = Math.max(mid, Math.min(W, p.x)) }
            if (p.y < 0 || p.y > H) { p.vy *= -1; p.y = Math.max(0, Math.min(H, p.y)) }
          }
        },
        draw() {
          const a = p.ordered ? 0.8 - p.influence * 0.5 : 0.75
          ctx.fillStyle = COLOR + Math.round(a * 255).toString(16).padStart(2, '0')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      return p
    }

    let particles: P[] = []

    function build() {
      particles = []
      const cols = Math.max(8, Math.floor(W / 32))
      const rows = Math.max(6, Math.floor(H / 32))
      const sx = W / cols, sy = H / rows
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++) {
          const x = sx * i + sx / 2, y = sy * j + sy / 2
          particles.push(makeP(x, y, x < W / 2))
        }
    }

    function updateNeighbors() {
      for (const p of particles)
        p.neighbors = particles.filter(o => o !== p && Math.hypot(p.x - o.x, p.y - o.y) < 100)
    }

    function loop() {
      ctx.clearRect(0, 0, W, H)
      if (time % 30 === 0) updateNeighbors()
      for (const p of particles) {
        p.update(); p.draw()
        for (const n of p.neighbors) {
          const d = Math.hypot(p.x - n.x, p.y - n.y)
          if (d < 50) {
            ctx.strokeStyle = COLOR + Math.round(0.15 * (1 - d / 50) * 255).toString(16).padStart(2, '0')
            ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y); ctx.stroke()
          }
        }
      }
      ctx.strokeStyle = COLOR + '22'; ctx.lineWidth = 0.5
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
      time++
      animId = requestAnimationFrame(loop)
    }

    function resize() {
      cancelAnimationFrame(animId)
      W = parent.offsetWidth; H = parent.offsetHeight
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build(); updateNeighbors(); time = 0; loop()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.55 }}
    />
  )
}
