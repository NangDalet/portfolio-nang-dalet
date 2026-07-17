"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle2, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  { value: "3+", label: "Years building software" },
  { value: "7", label: "Featured projects" },
  { value: "API", label: "Backend specialization" },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:min-h-screen lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-32 top-48 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-2 text-sm font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for software opportunities
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-muted-foreground">Hello, I&apos;m Nang Dalet</p>
          <h1 className="text-balance text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Software developer building <span className="text-gradient">reliable digital products.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl">
            I design and develop scalable APIs, backend systems, and full-stack applications that turn complex
            requirements into secure, maintainable software.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl px-6 shadow-lg shadow-primary/20">
              <a href="#projects">
                Explore my work <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-xl px-6 bg-background/50">
              <a href="#contact">
                Let&apos;s work together <Mail className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-12 rounded-xl px-5">
              <a href="/cv/Nang_Dalet_CV.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Phnom Penh, Cambodia
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/NangDalet"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/nang-dalet-3bb444231"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-border/70 pt-6">
            {highlights.map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-black tracking-tight sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-cyan-500/10 to-transparent blur-2xl" />
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-muted">
              <Image
                src="/profile.jpg"
                alt="Nang Dalet, Software Developer"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="mb-2 flex items-center gap-2 text-sm text-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Building production-ready systems
                </div>
                <p className="text-2xl font-bold">Backend-first. Product-minded.</p>
              </div>
            </div>
          </div>

          <div className="glass-panel absolute -left-5 top-12 hidden rounded-2xl px-4 py-3 shadow-xl sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Core stack</p>
            <p className="mt-1 text-sm font-bold">Java · Spring Boot · .NET</p>
          </div>
          <div className="glass-panel absolute -bottom-5 -right-4 rounded-2xl px-4 py-3 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Focus</p>
            <p className="mt-1 text-sm font-bold">APIs & Microservices</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
