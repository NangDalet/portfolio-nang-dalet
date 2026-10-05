"use client"

import { ErrorBoundary } from "../components/error-boundary"
import Hero from "../components/sections/hero"
import About from "../components/sections/about"
import Skills from "../components/sections/skills"
import Projects from "../components/sections/projects"
import Contact from "../components/sections/contact"
import Footer from "../components/sections/footer"
import Header from "../components/sections/header"

export default function HomePage() {
  return (
    <ErrorBoundary>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Testimonials /> */}
        <Contact />
        <Footer />
      </main>
    </ErrorBoundary>
  )
}
