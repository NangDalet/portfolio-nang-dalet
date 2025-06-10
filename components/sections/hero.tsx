"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowDownCircle, Download, Mail, Github, Linkedin } from "lucide-react"

export default function Hero() {
  const [imageError, setImageError] = useState(false)

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center lg:justify-end order-2 lg:order-1"
            >
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-2xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-xl"></div>

                {/* Main profile image */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl">
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-2">ND</div>
                        <div className="text-sm opacity-80">API Developer</div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src="/images/profile.jpg"
                      alt="Nang Dalet - API Developer"
                      width={320}
                      height={320}
                      className="object-cover w-full h-full"
                      onError={() => setImageError(true)}
                      priority
                      unoptimized
                    />
                  )}
                </div>

                {/* Floating status indicator */}
                <div className="absolute bottom-6 right-6 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left order-1 lg:order-2"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                  👋 Hello, I'm
                </span>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  <span className="block text-foreground mb-2">Nang</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Dalet
                  </span>
                </h1>
              </motion.div>

              {/* Title and Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4">API Developer</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Building efficient and scalable backend solutions that power modern applications. Passionate about
                  clean code, robust APIs, and seamless integrations.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Button size="lg" onClick={scrollToContact} className="group">
                  <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Get in touch
                </Button>
                <Button variant="outline" size="lg" onClick={scrollToProjects} className="group">
                  View my work
                  <ArrowDownCircle className="h-4 w-4 ml-2 group-hover:translate-y-1 transition-transform" />
                </Button>
                <Button variant="secondary" size="lg" onClick={downloadCV} className="group">
                  <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Download CV
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center lg:justify-start gap-4"
              >
                <a
                  href="https://github.com/NangDalet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-all hover:scale-110 group"
                >
                  <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nang-dalet-3bb444231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-all hover:scale-110 group"
                >
                  <Linkedin className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="mailto:nangdalet@gmail.com"
                  className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-all hover:scale-110 group"
                >
                  <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => {
            const element = document.getElementById("about")
            if (element) {
              element.scrollIntoView({ behavior: "smooth" })
            }
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium">Scroll down</span>
          <ArrowDownCircle className="h-6 w-6 animate-bounce group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
    </section>
  )
}
