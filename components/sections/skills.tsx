"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Code2, ServerCrash, Database, Terminal, LayoutGrid } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Skill = {
  name: string
  level: number
}

type SkillCategory = {
  name: string
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    icon: <Code2 className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React.js", level: 50 },
      { name: "Next.js", level: 50 },
      { name: "JavaScript", level: 70 },
      { name: "jQuery", level: 80 },
      { name: "HTML & CSS", level: 80 },
    ],
  },
  {
    name: "Backend Development",
    icon: <ServerCrash className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "C# Windows Form Application", level: 85 },
      { name: "ASP.NET CORE MVC", level: 85 },
      { name: "ASP.NET CORE API", level: 90 },
      { name: "Spring Boot", level: 90 },
      { name: "Microservice", level: 65 },
    ],
  },
  {
    name: "Database & Cloud",
    icon: <Database className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "SQL Server", level: 90 },
      { name: "PostgreSQL", level: 75 },
      { name: "MySQL", level: 90 },
      { name: "MongoDB", level: 50 },
    ],
  },
  {
    name: "Tools & Deployment",
    icon: <Terminal className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 80 },
      { name: "Testing", level: 75 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here's an overview of my technical skills and competencies across different domains.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 p-6 bg-card rounded-lg border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" />
              <span>Other Technologies I Work With</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Vue.js", "REST APIs", "Vercel", "GitHub Actions", "Kubernetes"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
