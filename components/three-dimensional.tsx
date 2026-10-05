"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`tilt-card ${className}`} onPointerMove={(event) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const box = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5
    event.currentTarget.style.transform = `perspective(1000px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateY(-4px)`
  }} onPointerLeave={(event) => { event.currentTarget.style.transform = "" }}>{children}</div>
}

export function ChromeSculpture() {
  const [paused, setPaused] = useState(false)
  return <div className="sculpture-wrap">
    <div className="sculpture-grid" aria-hidden="true" />
    <div className={`sculpture-stage ${paused ? "is-paused" : ""}`} aria-hidden="true">
      <div className="sculpture-shadow" />
      <div className="chrome-sculpture">
        {Array.from({ length: 7 }, (_, i) => <div key={i} className="chrome-ring" style={{ "--ring-index": i } as CSSProperties} />)}
        <div className="sculpture-core"><span>&lt;/&gt;</span></div>
      </div>
    </div>
    <span className="scene-coordinate scene-coordinate-top" aria-hidden="true">ND / DIGITAL CRAFT</span>
    <span className="scene-coordinate scene-coordinate-bottom" aria-hidden="true">01 — ENGINEERING IN MOTION</span>
    <button className="scene-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "▶ Play motion" : "Ⅱ Pause motion"}</button>
  </div>
}

const technologies = ["Java", "Spring Boot", "React", "Next.js", "TypeScript", "C#", ".NET", "MySQL", "PostgreSQL", "Docker", "Git", "REST APIs", "Tailwind", "MongoDB", "CI/CD", "Microservices"]

export function SkillSphere() {
  const container = useRef<HTMLDivElement>(null)
  const tags = useRef<(HTMLSpanElement | null)[]>([])
  const pointer = useRef({ x: 0, y: 0 })
  const angle = useRef(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0, previous = 0, visible = true
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    if (container.current) observer.observe(container.current)
    const render = (time: number) => {
      const delta = previous ? Math.min(time - previous, 50) : 0
      previous = time
      if (visible) {
        if (!paused && !reduced.matches) angle.current += delta * 0.00012
        const radius = Math.min((container.current?.clientWidth ?? 400) * 0.37, 175)
        technologies.forEach((_, i) => {
          const y = 1 - (i / (technologies.length - 1)) * 2
          const radial = Math.sqrt(1 - y * y)
          const theta = i * Math.PI * (3 - Math.sqrt(5)) + angle.current + pointer.current.x * 0.45
          const x = Math.cos(theta) * radial, z = Math.sin(theta) * radial
          const pitch = pointer.current.y * 0.3
          const py = y * Math.cos(pitch) - z * Math.sin(pitch), pz = y * Math.sin(pitch) + z * Math.cos(pitch)
          const element = tags.current[i]
          if (element) {
            element.style.transform = `translate(-50%, -50%) translate(${x * radius}px, ${py * radius}px) scale(${0.8 + (pz + 1) * 0.2})`
            element.style.opacity = String(0.42 + (pz + 1) * 0.29)
            element.style.zIndex = String(Math.round((pz + 1) * 10))
          }
        })
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [paused])
  return <div className="skill-sphere-panel">
    <div className="sphere-heading"><span className="mono-label">MY TECHNOLOGY UNIVERSE</span><span className="sphere-live">16 TOOLS</span></div>
    <div ref={container} className="skill-sphere" aria-label="Technology skills" onPointerMove={(event) => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const box = event.currentTarget.getBoundingClientRect()
      pointer.current = { x: (event.clientX - box.left) / box.width - 0.5, y: (event.clientY - box.top) / box.height - 0.5 }
    }} onPointerLeave={() => { pointer.current = { x: 0, y: 0 } }}>
      <div className="sphere-wireframe" aria-hidden="true"><i /><i /><i /></div>
      {technologies.map((tech, i) => <span key={tech} ref={(element) => { tags.current[i] = element }} className="sphere-tag">{tech}</span>)}
    </div>
    <div className="sphere-footer"><span>Move your cursor to explore</span><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Resume rotation ↗" : "Pause rotation Ⅱ"}</button></div>
  </div>
}
