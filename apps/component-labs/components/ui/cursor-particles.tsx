"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

const PARTICLE_COLORS = ["#ff6b00", "#ff9500", "#ffcc00", "#ff4400", "#ffffff"]

export function CursorParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const counter = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(any-hover: hover) and (any-pointer: fine)")
    if (!mediaQuery.matches) return

    let rafId = 0

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        const dx = e.clientX - lastPos.current.x
        const dy = e.clientY - lastPos.current.y
        const speed = Math.sqrt(dx * dx + dy * dy)

        if (speed > 3) {
          const particle: Particle = {
            id: counter.current++,
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 6 + 3,
            color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
          }
          setParticles(prev => [...prev.slice(-30), particle])
          lastPos.current = { x: e.clientX, y: e.clientY }
        }

        rafId = 0
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <AnimatePresence>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
            pointerEvents: "none",
            zIndex: 99,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: 15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() =>
            setParticles(prev => prev.filter(particle => particle.id !== p.id))
          }
        />
      ))}
    </AnimatePresence>
  )
}
