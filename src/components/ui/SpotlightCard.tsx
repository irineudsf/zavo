'use client'
import { useRef, useState, MouseEvent } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  spotlightColor?: string
}

export function SpotlightCard({ children, spotlightColor = 'rgba(245,184,0,0.12)' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
          zIndex: 0,
        }}
      />
      {/* border glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: opacity * 0.6,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(245,184,0,0.25), transparent 70%)`,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
