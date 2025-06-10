"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Heart, Music, Coffee, Download, MapPin, Calendar } from "lucide-react"

export default function About() {
  const downloadCV = () => {
    try {
      fetch("/cv/Nang_Dalet_CV.pdf", { method: "HEAD" })
        .then((response) => {
          if (response.ok) {
            const link = document.createElement("a")
            link.href = "/cv/Nang_Dalet_CV.pdf"
            link.download = "Nang_Dalet_CV.pdf"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } else {
            alert("CV is currently being updated. Please contact me directly for the latest version.")
          }
        })
        .catch(() => {
          alert("CV download is temporarily unavailable. Please contact me directly.")
        })
    } catch (error) {
      console.error("Error downloading CV:", error)
      alert("CV download is temporarily unavailable. Please contact me directly.")
    }
  }

  const experiences = [
    {
      title: "API Developer",
      company: "Udaya Technology CO LTD",
      period: "Aug 2023 - Present",
      location: "Phnom Penh, Cambodia",
      description:
        "Using Java and Spring Boot to maintain systems and build APIs, with MySQL as the database. Worked on projects including Visit Angkor System, Vireak Buntham Express, VET Ticket System, and VET Agency. Supported team in integrating with Red Bus and VET Digital Bus. Contributed to upgrading systems to microservices architecture for Room Management System (Backend and Mobile APIs) and transformed Vireak Buntham Express API system into microservices.",
      highlights: ["Java", "Spring Boot", "MySQL", "Microservices", "API Integration", "Red Bus", "VET Digital Bus"],
      current: true,
    },
    {
      title: "Web Developer",
      company: "Centric Kernel CO LTD",
      period: "May 2023 - Aug 2023",
      location: "Phnom Penh, Cambodia",
     description:"Using C#, JavaScript, jQuery, ASP.NET Core Web API, and ASP.NET Core MVC to maintain systems, with SQL Server for database management. Worked on projects including POS systems for restaurants, coffee shops, and stock management.",
      highlights: ["C#", "ASP.NET Core", "SQL Server", "POS Systems"],
    },
    {
      title: "Web Developer",
      company: "Blue Technology CO LTD",
      period: "Dec 2022 - Feb 2023",
      location: "Phnom Penh, Cambodia",
      description:
        "Using C# and ASP.NET Framework to maintain systems, with SQL Server for database management. Worked on projects including building human resource systems.",
      highlights: ["C#", "ASP.NET Framework", "HR Systems", "Inventory Management"],
    },
  ]

  const interests = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Volunteering",
      description: "Tech mentor for local youth",
    },
    {
      icon: <Music className="h-5 w-5" />,
      title: "Music",
      description: "Amateur guitarist & producer",
    },
    {
      icon: <Coffee className="h-5 w-5" />,
      title: "Coffee",
      description: "Aspiring home barista",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Learning",
      description: "Always exploring new tech",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                About Me
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Get to know me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gradient">My Journey</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I started my career in design, where I developed a strong sense of clarity, structure, and
                    user-centered thinking. This foundation naturally guided me into backend development, where I found
                    my passion for building APIs that connect and power modern applications.
                  </p>
                  <p>
                    With 2+ years of experience as an API Developer, I've contributed to creating scalable, secure, and
                    well-documented APIs that serve both startups and growing businesses.
                  </p>
                  <p>
                    From designing RESTful endpoints to integrating third-party services, I focus on building backend
                    solutions that enable seamless communication and smooth performance across platforms.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={downloadCV} size="lg" className="group">
                  <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Download My CV
                </Button>
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Education</h4>
                      <Badge variant="secondary">2018 - 2022</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-semibold text-lg">Bachelor of Computer Science</h5>
                    <p className="text-muted-foreground">University of Management and Economics</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Phnom Penh, Cambodia</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Professional Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className={`border-l-4 ${exp.current ? "border-l-green-500 bg-green-50/50 dark:bg-green-950/20" : "border-l-blue-500"} hover:shadow-md transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold">{exp.title}</h4>
                          {exp.current && <Badge className="bg-green-500 hover:bg-green-600">Current</Badge>}
                        </div>
                        <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-1">{exp.company}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">When I'm Not Coding</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interests.map((item, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}