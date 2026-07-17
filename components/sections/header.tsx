"use client"

import { Code2, Download, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Go to home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:-rotate-3 group-hover:scale-105">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">Nang Dalet</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Software Developer
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="/cv/Nang_Dalet_CV.pdf"
            download
            className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary sm:flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navigation.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <a href={item.href} className="cursor-pointer font-medium">
                    {item.label}
                  </a>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="sm:hidden">
                <a href="/cv/Nang_Dalet_CV.pdf" download className="cursor-pointer font-medium">
                  Download resume
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
