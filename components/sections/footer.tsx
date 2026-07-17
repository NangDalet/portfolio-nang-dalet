"use client"

import { ArrowUp, Code2, Github, Linkedin, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-10">
      <div className="section-shell">
        <div className="flex flex-col gap-8 border-b border-border/70 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold">Nang Dalet</p>
              <p className="text-sm text-muted-foreground">Software Developer · Phnom Penh</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/NangDalet"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/nang-dalet-3bb444231"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:nangdalet@gmail.com"
              className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <ThemeToggle />
            <a
              href="#home"
              className="ml-1 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              Back to top <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Nang Dalet. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
