"use client"

import { HeartIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 py-12 border-t">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-xl mb-2">Nang Dalet</h3>
                <p className="text-muted-foreground text-sm">
                  Building beautiful backend API experiences
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Terms of Service
                </a>
                <ThemeToggle />
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground text-center md:text-left mb-4 md:mb-0">
                © {currentYear} Nang Dalet. All rights reserved.
              </p>

              <p className="text-sm text-muted-foreground flex items-center">
                Made with
                <HeartIcon className="h-4 w-4 text-destructive mx-1" />
                and a lot of coffee
              </p>
            </div>

            <div className="mt-8 text-center text-xs text-muted-foreground">
              <p>
                This website is built with Next.js, Tailwind CSS, and Framer Motion.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
