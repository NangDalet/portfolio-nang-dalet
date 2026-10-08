"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play, Github, Download } from "lucide-react"
import PortfolioWorld from "@/components/portfolio-world"
import { projects } from "@/lib/projects"

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const chapterRef = useRef(0)
  const [chapter, setChapter] = useState(0)
  const [paused, setPaused] = useState(false)
  const project = chapter > 0 ? projects[chapter - 1] : null

  useEffect(() => {
    const section = root.current
    if (!section) return
    const update = () => {
      const rect = section.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, section.offsetHeight - window.innerHeight)))
      progress.current = p
      section.style.setProperty("--journey-progress", `${p * 100}%`)
      const current = Math.round(p * projects.length)
      if (current !== chapterRef.current) { chapterRef.current = current; setChapter(current) }
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update) }
  }, [])

  const jump = (index: number) => {
    const section = root.current
    if (!section) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (index > projects.length) { document.getElementById("about")?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" }); return }
    const top = window.scrollY + section.getBoundingClientRect().top
    const distance = section.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + distance * index / projects.length, behavior: reduced ? "instant" : "smooth" })
  }

  return <section ref={root} id="home" className={`cinematic-hero ${project ? "is-exploring" : "is-entrance"}`} aria-label="Interactive portfolio journey">
    <div id="journey" className="journey-anchor" aria-hidden="true" />
    <div className="world-stage">
      <PortfolioWorld progress={progress} paused={paused} />
      <div className="world-topline"><span>INDEPENDENT DEVELOPER<br /><b>PHNOM PENH, CAMBODIA</b></span><span className="world-coordinate">11°33′ N / 104°55′ E</span></div>
      <div className="world-intro" aria-hidden={!!project}>
        <p className="world-eyebrow">NANG DALET / SOFTWARE DEVELOPER</p>
        <h1>Engineering.<br /><em>In motion.</em></h1>
        <p className="world-description">A world of ideas, connected by code.<br />Explore the systems and experiences I build.</p>
        <button className="world-enter" onClick={() => jump(1)} tabIndex={project ? -1 : 0}>Enter my world <ArrowRight size={15} /></button>
      </div>
      {project && <div className="world-project-copy" key={project.id} aria-live="polite">
        <p className="world-eyebrow">SELECTED WORK / {String(chapter).padStart(2, "0")} — {project.year}</p>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="world-project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <a className="world-enter" href={`#project-${project.id}`}>Explore project <ArrowUpRight size={15} /></a>
      </div>}
      {project && <div className="world-static-preview"><Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 767px) 80vw, 45vw" className="object-contain" /></div>}
      <aside className="world-chapters" aria-label="Choose a scene">
        <span>EXPLORE</span>
        <button onClick={() => jump(0)} aria-label="Return to entrance scene" aria-current={chapter === 0 ? "step" : undefined}><i />00</button>
        {projects.map((item, index) => <button key={item.id} onClick={() => jump(index + 1)} aria-label={`Explore ${item.title} in 3D`} aria-current={chapter === index + 1 ? "step" : undefined}><i />{String(index + 1).padStart(2, "0")}</button>)}
      </aside>
      <div className="world-bottom">
        <div className="world-bottom-left"><a href="/cv/Nang_Dalet_CV.pdf" download><Download size={13} /> RESUME</a><a href="https://github.com/NangDalet" target="_blank" rel="noopener noreferrer"><Github size={13} /> GITHUB</a><a href="#projects">VIEW ALL WORK <ArrowUpRight size={12} /></a></div>
        <span className="world-scroll-hint">{project ? "SCROLL TO TRAVEL" : "SCROLL TO DISCOVER"}<ArrowDown size={13} /></span>
        <div className="world-controls"><button aria-label={paused ? "Resume ambient motion" : "Pause ambient motion"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button><button onClick={() => jump(chapter - 1)} disabled={chapter === 0} aria-label="Previous scene"><ArrowLeft size={15} /></button><button onClick={() => jump(chapter + 1)} aria-label={chapter === projects.length ? "Continue to about me" : "Next scene"}><ArrowRight size={15} /></button><span>{String(chapter).padStart(2, "0")} / 07</span></div>
      </div>
      <div className="world-progress" aria-hidden="true"><i /></div>
      <a className="world-skip" href="#about">Skip to about me <ArrowDown size={11} /></a>
    </div>
  </section>
}
