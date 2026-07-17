"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFallbackMessage, setShowFallbackMessage] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setShowFallbackMessage(false)

    try {
      // Try API route first
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const responseData = await response.json()

      if (response.ok) {
        form.reset()
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        return
      }

      // Handle specific error codes
      if (responseData.code === "MISSING_CONFIG") {
        setShowFallbackMessage(true)
        toast({
          title: "Contact form temporarily unavailable",
          description: "Please use the alternative contact methods below.",
          variant: "destructive",
        })
        return
      }

      if (responseData.code === "VALIDATION_ERROR") {
        toast({
          title: "Please check your input",
          description: responseData.details?.join(", ") || "Please fill in all required fields correctly.",
          variant: "destructive",
        })
        return
      }

      // Handle other API errors
      toast({
        title: "Failed to send message",
        description: responseData.details || "Please try again or use the alternative contact methods below.",
        variant: "destructive",
      })
      setShowFallbackMessage(true)
    } catch (error) {
      console.error("Error sending message:", error)
      setShowFallbackMessage(true)
      toast({
        title: "Network error",
        description: "Please check your connection or use the alternative contact methods below.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openTelegramChat = () => {
    window.open("https://t.me/nangdalet", "_blank")
  }

  const openEmailClient = () => {
    const values = form.getValues()
    const subject = values.subject || "Contact from Portfolio"
    const body = values.message ? `Hi Nang,\n\n${values.message}\n\nBest regards,\n${values.name}` : ""
    const mailtoUrl = `mailto:nangdalet@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl, "_blank")
  }

  return (
    <section id="contact" className="border-y border-border/60 bg-muted/30 py-24">
      <div className="section-shell">
        <div>
          <div className="mb-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Get in touch</span>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-5xl">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Have a role, product, or collaboration in mind? Send me a message and I&apos;ll get back to you as soon
                as possible.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            <motion.div
              className="space-y-8 rounded-2xl border border-border/70 bg-card/70 p-6 md:col-span-2 sm:p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="mb-6 text-xl font-bold">Contact information</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-xl bg-primary/10 p-2.5">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:nangdalet@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        nangdalet@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-xl bg-primary/10 p-2.5">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+85570726363" className="text-muted-foreground hover:text-primary transition-colors">
                        +855 (070) 726-363
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-xl bg-primary/10 p-2.5">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Phnom Penh, Cambodia</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-xl bg-primary/10 p-2.5">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Telegram</p>
                      <button
                        onClick={openTelegramChat}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @nangdalet
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-muted-foreground">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/NangDalet"
                    className="rounded-xl border border-border p-3 transition-colors hover:border-primary/30 hover:bg-primary/10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nang-dalet-3bb444231"
                    className="rounded-xl border border-border p-3 transition-colors hover:border-primary/30 hover:bg-primary/10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <button
                    onClick={openTelegramChat}
                    className="rounded-xl border border-border p-3 transition-colors hover:border-primary/30 hover:bg-primary/10"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="sr-only">Telegram</span>
                  </button>
                </div>
              </div>

              {showFallbackMessage && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Alternative Contact Methods:</strong>
                    <div className="mt-2 space-y-2">
                      <Button variant="outline" size="sm" onClick={openEmailClient} className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email Directly
                      </Button>
                      <Button variant="outline" size="sm" onClick={openTelegramChat} className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat on Telegram
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>

            <motion.div
              className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-xl shadow-primary/5 md:col-span-3 sm:p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">Send a message</h3>
                    <p className="mt-1 text-sm text-muted-foreground">All fields are required.</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input className="h-11 bg-background/60" placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input className="h-11 bg-background/60" type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input className="h-11 bg-background/60" placeholder="Subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-36 bg-background/60" rows={6} placeholder="Tell me about your project or opportunity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="submit" disabled={isSubmitting} className="h-11 flex-1 rounded-xl">
                      {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" onClick={openEmailClient} className="h-11 rounded-xl">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
