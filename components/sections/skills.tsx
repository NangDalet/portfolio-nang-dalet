"use client"

import { motion } from "framer-motion"
import { Braces, Database, GitBranch, Server } from "lucide-react"
import { SkillSphere, TiltCard } from "@/components/three-dimensional"

const skillGroups = [
  { title: "Backend & APIs", description: "The engine behind the experience.", icon: Server, skills: ["Java", "Spring Boot", "C#", "ASP.NET Core", "REST APIs", "Microservices"] },
  { title: "Frontend", description: "Interfaces that feel effortless.", icon: Braces, skills: ["Next.js", "React", "JavaScript", "TypeScript", "Tailwind CSS", "jQuery"] },
  { title: "Data & Storage", description: "A solid foundation for every product.", icon: Database, skills: ["MySQL", "SQL Server", "PostgreSQL", "MongoDB", "Entity Framework", "JPA"] },
  { title: "Delivery & Quality", description: "From a good idea to a reliable release.", icon: GitBranch, skills: ["Git", "Docker", "CI/CD", "Testing", "API Documentation", "System Integration"] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="section-shell">
        <div className="modern-section-heading"><div><span className="section-eyebrow">02 / THE TOOLKIT</span><h2>A practical stack.<br /><span>Endless possibilities.</span></h2></div><p>Backend-first, full-stack capable. The tools I use to take a product from database to interface.</p></div>
        <div className="toolkit-layout">
          <div className="toolkit-universe"><SkillSphere /><p>Good engineering starts with choosing the right tools for the problem.</p></div>
          <div className="toolkit-cards">
            {skillGroups.map((group, index) => {
              const Icon = group.icon
              return <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: index * .06 }}>
                <TiltCard className="h-full"><article className="toolkit-card glass-surface"><div className="toolkit-card-top"><Icon className="h-5 w-5" /><span>0{index + 1}</span></div><h3>{group.title}</h3><p>{group.description}</p><div className="toolkit-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article></TiltCard>
              </motion.div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
