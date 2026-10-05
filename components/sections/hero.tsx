"use client"

import Image from "next/image"
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, MapPin } from "lucide-react"
import { ChromeSculpture, TiltCard } from "@/components/three-dimensional"

export default function Hero() {
  return (
    <section id="home" className="portfolio-hero relative overflow-hidden">
      <div className="section-shell">
        <div className="hero-composition">
          <div className="hero-copy">
            <div className="hero-identity"><span className="identity-line" /> Nang Dalet <span>/ Software Developer</span></div>
            <h1 className="hero-headline">Thoughtful code.<br /><span>Real-world<br className="headline-mobile-break" /> impact.</span></h1>
            <p className="hero-description">I turn complex problems into reliable software. With 3+ years of experience, I build the APIs, backend systems, and interfaces that bring products to life.</p>
            <div className="hero-actions">
              <a className="editorial-button" href="#projects">View selected work <ArrowUpRight className="h-4 w-4" /></a>
              <a className="resume-link" href="/cv/Nang_Dalet_CV.pdf" download><Download className="h-4 w-4" /> Download CV</a>
            </div>
            <div className="hero-proof">
              <div><strong>3<span>+</span></strong><span>Years of experience</span></div>
              <div><strong>7</strong><span>Featured projects</span></div>
              <div><strong className="proof-specialty">Backend</strong><span>Full-stack capable</span></div>
            </div>
          </div>
          <div className="hero-art hero-art-portrait">
            <ChromeSculpture />
            <div className="portrait-orbit" aria-hidden="true" />
            <TiltCard className="hero-portrait-card">
              <div className="hero-portrait-photo">
                <Image src="/profile.jpg" alt="Portrait of Nang Dalet, software developer" fill priority sizes="(max-width: 767px) 85vw, (max-width: 1023px) 42vw, 480px" className="object-cover object-top" />
                <div className="hero-portrait-caption"><p>Nang Dalet<span>Software Developer</span></p></div>
              </div>
            </TiltCard>
            <div className="portrait-status glass-surface"><span className="status-dot" /><div><span>Good software starts with a conversation.</span><a href="#contact">Let&apos;s build something <ArrowUpRight className="h-4 w-4" /></a></div></div>
            <div className="portrait-stack glass-surface"><span className="mono-label">CORE STACK</span><p>Java <span>/</span> Spring Boot <span>/</span> .NET</p></div>
          </div>
        </div>
        <div className="hero-bottomline">
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Based in Phnom Penh, Cambodia</span>
          <div className="hero-socials"><a href="https://github.com/NangDalet" target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3 w-3" /></a><a href="https://www.linkedin.com/in/nang-dalet-3bb444231" target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3 w-3" /></a></div>
          <a href="#projects" className="flex items-center gap-3">Explore below <ArrowDown className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  )
}
