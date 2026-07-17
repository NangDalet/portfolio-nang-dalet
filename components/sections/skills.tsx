"use client"

import { motion } from "framer-motion"
import { Braces, Database, GitBranch, Layers3, Server } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const skillGroups = [
  {
    title: "Backend & APIs",
    description: "Reliable services, integrations, and business logic.",
    icon: Server,
    skills: ["Java", "Spring Boot", "C#", "ASP.NET Core", "REST APIs", "Microservices"],
  },
  {
    title: "Frontend",
    description: "Responsive interfaces for modern web products.",
    icon: Braces,
    skills: ["Next.js", "React", "JavaScript", "TypeScript", "Tailwind CSS", "jQuery"],
  },
  {
    title: "Data & Storage",
    description: "Practical data modeling and query optimization.",
    icon: Database,
    skills: ["MySQL", "SQL Server", "PostgreSQL", "MongoDB", "Entity Framework", "JPA"],
  },
  {
    title: "Delivery & Quality",
    description: "Repeatable workflows from commit to production.",
    icon: GitBranch,
    skills: ["Git", "Docker", "CI/CD", "Testing", "API Documentation", "System Integration"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="border-y border-border/60 bg-muted/30 py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Technical toolkit</span>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-5xl">
              The tools I use to ship dependable software.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              My strongest work sits at the intersection of backend engineering, API design, and practical product
              delivery. I choose technology based on the problem—not the trend.
            </p>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/10 p-5">
              <Layers3 className="h-6 w-6 text-primary" />
              <p className="mt-3 font-bold">Backend-first, full-stack capable</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Comfortable owning database design, API implementation, integration, and the frontend experience that
                consumes it.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group, index) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="group h-full border-border/70 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5">
                    <CardContent className="p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold">{group.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-border/80 bg-background/60 px-2.5 py-1.5 text-xs font-semibold text-foreground/80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
