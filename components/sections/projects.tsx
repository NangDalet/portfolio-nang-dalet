"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  year: string
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: 5,
    title: "School Management",
    description: "A full-stack school operations platform built with Next.js, Spring Boot, and MySQL.",
    image: "/SchoolManagement.png",
    tags: ["Next.js", "Spring Boot", "MySQL"],
    category: "Full Stack",
    year: "2025",
  },
  {
    id: 7,
    title: "Bus Mini App Booking",
    description: "A mobile-first booking flow for route search, schedules, seat selection, and bus tickets.",
    image: "/BusBookingMiniApp.avif",
    tags: ["Mini App", "Spring Boot API", "MySQL"],
    category: "Mobile Application",
    year: "2025",
  },
  {
    id: 6,
    title: "VireakBuntham Booking System",
    description: "A web reservation platform for intercity routes, passenger bookings, and travel operations.",
    image: "/BusBookingSystem.png",
    tags: ["Spring Boot API", "MySQL"],
    category: "Web Development",
    year: "2023",
    liveUrl: "https://qavetwebbus.udaya-tech.com/",
  },
  {
    id: 1,
    title: "Wedding Tracker",
    description: "A Windows application for organizing wedding planning, logistics, and operational tasks.",
    image: "/WeddingTracker.png",
    tags: ["C#", "SQL Server"],
    category: "Windows Application",
    year: "2023",
    githubUrl: "https://github.com/ouknhastev99/SystemWedding",
  },
  {
    id: 3,
    title: "Sale Inventory",
    description: "An inventory and sales management system for products, transactions, and business reporting.",
    image: "/Inventory.png",
    tags: ["C#", "SQL Server"],
    category: "Data Management",
    year: "2023",
    githubUrl: "https://github.com/NangDalet/Sale_Inventory",
  },
  {
    id: 4,
    title: "Stock Management",
    description: "A responsive stock-tracking platform for inventory visibility and day-to-day operations.",
    image: "/StockManagement.png",
    tags: ["Laravel", "MySQL", "JavaScript", "CSS"],
    category: "Web Development",
    year: "2022",
    githubUrl: "https://github.com/ouknhastev99/stock",
  },
  {
    id: 2,
    title: "Student Register",
    description: "A web-based school management system for student data and administrative workflows.",
    image: "/StuentRegister.png",
    tags: ["ASP.NET Core MVC", "SQL Server", "jQuery", "Bootstrap"],
    category: "Web Development",
    year: "2021",
    githubUrl: "https://github.com/NangDalet/SchoolManagement",
  },
]

const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))]

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All")
  const filteredProjects =
    activeTab === "All" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <section id="projects" className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Selected work</span>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-5xl">
              Products built for real workflows.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A selection of backend, web, desktop, and mobile-focused projects across transport, education, inventory,
              and operations.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-auto max-w-full justify-start gap-1 overflow-x-auto rounded-xl border border-border bg-card/70 p-1.5 lg:max-w-lg lg:flex-wrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="whitespace-nowrap rounded-lg px-3 py-2 text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-card/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-emerald-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Calendar className="h-3.5 w-3.5 text-emerald-300" /> {project.year}
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{project.category}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-md text-[11px] font-semibold">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {(project.liveUrl || project.githubUrl) && (
                    <div className="mt-6 flex items-center gap-4 border-t border-border/70 pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary/75"
                        >
                          View live <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Github className="h-4 w-4" /> Source
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
