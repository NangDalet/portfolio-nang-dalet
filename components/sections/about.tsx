"use client"

import { motion } from "framer-motion"
import { BriefcaseBusiness, Calendar, Download, GraduationCap, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    role: "API Developer",
    company: "Udaya Technology Co., Ltd.",
    period: "Aug 2023 — Present",
    description:
      "Develop and maintain Java and Spring Boot APIs backed by MySQL. Contribute to booking, room management, and transport platforms while supporting third-party integrations and the migration of core systems toward microservices.",
    technologies: ["Java", "Spring Boot", "MySQL", "Microservices", "System Integration"],
    current: true,
  },
  {
    role: "Web Developer",
    company: "Centric Kernel Co., Ltd.",
    period: "May 2023 — Aug 2023",
    description:
      "Built and maintained business applications with C#, ASP.NET Core Web API, MVC, JavaScript, jQuery, and SQL Server, including POS and stock-management solutions.",
    technologies: ["C#", "ASP.NET Core", "SQL Server", "JavaScript"],
  },
  {
    role: "Web Developer",
    company: "Blue Technology Co., Ltd.",
    period: "Dec 2022 — Feb 2023",
    description:
      "Maintained ASP.NET Framework and SQL Server systems and contributed to human-resource management software.",
    technologies: ["C#", "ASP.NET Framework", "SQL Server"],
  },
]

const training = [
  "ASP.NET Core MVC",
  "ASP.NET Core Web API",
  "Spring Boot API",
  "Microservices Level 1 & 2",
  "Spring Core",
  "Laravel",
  "MySQL",
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">About me</span>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-5xl">
              I build software that stays useful after launch day.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted-foreground">
              <p>
                I&apos;m a software developer based in Phnom Penh with professional experience building backend APIs,
                web applications, integrations, and data-driven business systems.
              </p>
              <p>
                My approach combines clean implementation with practical product thinking. I care about clear API
                contracts, maintainable architecture, reliable data, and smooth collaboration across engineering teams.
              </p>
            </div>
            <Button asChild size="lg" className="mt-8 rounded-xl">
              <a href="/cv/Nang_Dalet_CV.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download my resume
              </a>
            </Button>
          </div>

          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-xl shadow-primary/5">
            <CardContent className="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Currently</p>
                  <p className="font-bold">API Developer at Udaya Technology</p>
                </div>
              </div>
              <div className="my-7 h-px bg-border" />
              <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</dt>
                  <dd className="mt-2 flex items-center gap-2 font-semibold">
                    <MapPin className="h-4 w-4 text-primary" /> Phnom Penh
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Education</dt>
                  <dd className="mt-2 flex items-center gap-2 font-semibold">
                    <GraduationCap className="h-4 w-4 text-primary" /> Computer Science
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Specialization</dt>
                  <dd className="mt-2 font-semibold">APIs & backend systems</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Availability</dt>
                  <dd className="mt-2 font-semibold">Open to opportunities</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mt-24">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Career journey</span>
              <h3 className="mt-3 text-3xl font-black tracking-tight">Professional experience</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Experience across APIs, business platforms, POS systems, stock management, and enterprise integrations.
            </p>
          </div>

          <div className="relative space-y-5 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-border sm:before:left-[11.5rem]">
            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.company}-${experience.role}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative grid gap-4 rounded-2xl border border-border/70 bg-card/70 p-6 transition-colors hover:border-primary/30 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <div className="pl-8 sm:pl-0">
                  <span className="absolute left-[1.02rem] top-7 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background sm:left-[11.22rem]" />
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {experience.period}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xl font-bold">{experience.role}</h4>
                    {experience.current && <Badge className="bg-primary/15 text-primary hover:bg-primary/15">Current</Badge>}
                  </div>
                  <p className="mt-1 font-semibold text-primary">{experience.company}</p>
                  <p className="mt-4 leading-7 text-muted-foreground">{experience.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <Badge key={technology} variant="secondary" className="font-medium">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-border/70">
            <CardContent className="p-7">
              <GraduationCap className="h-7 w-7 text-primary" />
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-muted-foreground">Education</p>
              <h3 className="mt-2 text-xl font-bold">Bachelor of Computer Science</h3>
              <p className="mt-2 text-muted-foreground">University of Management and Economics</p>
              <p className="mt-4 text-sm font-semibold">2018 — 2022 · Battambang, Cambodia</p>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="p-7">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Continued learning</p>
              <h3 className="mt-2 text-xl font-bold">Technical training</h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {training.map((item) => (
                  <span key={item} className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm font-semibold">
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
