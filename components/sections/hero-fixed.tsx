"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowDownCircle, Download } from "lucide-react"

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
      const link = document.createElement("a")
      link.href = "/cv/Nang_Dalet_CV.pdf"
      link.download = "Nang_Dalet_CV.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading CV:", error)
      window.open("/cv/Nang_Dalet_CV.pdf", "_blank")
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-16">
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[170px] h-[170px] rounded-full border-4 border-white shadow-lg mb-6 overflow-hidden bg-muted"
          >
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                ND
              </div>
            ) : (
              <Image
                src="/images/profile.jpg"
                alt="Nang Dalet - API Developer"
                width={250}
                height={250}
                className="object-cover w-full h-full"
                onError={() => setImageError(true)}
                priority
                unoptimized
              />
            )}
          </motion.div>

          {/* Name & Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-foreground">Hello, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Nang Dalet
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            API Developer building efficient and scalable solutions to complex problems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" onClick={scrollToContact}>
              Get in touch
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToProjects}>
              View my work
            </Button>
            <Button variant="secondary" size="lg" onClick={downloadCV}>
              <Download className="h-4 w-4 mr-2" />
              Download CV
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll down icon */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => {
            const element = document.getElementById("about")
            if (element) {
              element.scrollIntoView({ behavior: "smooth" })
            }
          }}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDownCircle className="h-10 w-10" />
          <span className="sr-only">Scroll down</span>
        </button>
      </div>
    </section>
  )
}
