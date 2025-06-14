"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Tag, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Wedding Tracker",
    description:
      "Wedding Tracker is a comprehensive Windows-based application developed using C# and SQL Server to efficiently manage wedding planning tasks.",
    image:
      "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["C#", "SQL Server"],
    category: "Windows Application",
    year: "2023",
    githubUrl: "https://github.com/ouknhastev99/SystemWedding",
  },
  {
    id: 2,
    title: "Student Register",
    description:
      "Student Register is a web-based school management system built with ASP.NET Core MVC, SQL Server, and Entity Framework.",
    image:
      "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["ASP.NET CORE MVC", "SQL Server", "jQuery", "Bootstrap"],
    category: "Web Development",
    year: "2021",
    githubUrl: "https://github.com/NangDalet/SchoolManagement",
  },
  {
    id: 3,
    title: "Sale Inventory",
    description:
      "Sale Inventory is a Windows-based inventory and sales management system developed with C# and SQL Server.",
    image:
      "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["C#", "SQL Server"],
    category: "Data Management",
    year: "2023",
    githubUrl: "https://github.com/NangDalet/Sale_Inventory",
  },
  {
    id: 4,
    title: "Stock Management",
    description:
      "Stock Management is a responsive inventory tracking system built with Laravel and MySQL.",
    image:
      "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Laravel", "MySQL", "JavaScript", "CSS"],
    category: "Web Development",
    year: "2022",
    githubUrl: "https://github.com/ouknhastev99/stock",
  },
  {
    id: 5,
    title: "School Management",
    description:
      "School Management is a full-stack web application built with Next.js, Spring Boot, and MySQL.",
    image:
      "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Next.js", "Spring Boot", "MySQL"],
    category: "Full Stack",
    year: "2025",
  },
  {
    id: 6,
    title: "VireakBuntham Booking System",
    description:
      "VireakBuntham Booking System is a web-based reservation platform developed using Spring Boot and MySQL.",
    image:
      "/vireakbuntham.png?auto=compress&cs=tinysrgb&w=400",
    tags: ["Spring Boot API", "MySQL"],
    category: "Web Development",
    year: "2023",
    liveUrl: "https://qavetwebbus.udaya-tech.com/",
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore my recent work across various domains, from web applications to mobile experiences.
              </p>
            </motion.div>
          </div>

          <Tabs defaultValue="All" className="mb-12">
            <TabsList className="mx-auto flex justify-center flex-wrap">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" /> {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live site"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" /> Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub repository"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
