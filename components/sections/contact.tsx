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
    <section id="contact" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you. Reach
                out using the form below or contact me directly.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <motion.div
              className="md:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
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
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
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
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Phnom Penh, Cambodia</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
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
                <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/NangDalet"
                    className="p-3 bg-card hover:bg-primary/10 rounded-full transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nang-dalet-3bb444231"
                    className="p-3 bg-card hover:bg-primary/10 rounded-full transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <button
                    onClick={openTelegramChat}
                    className="p-3 bg-card hover:bg-primary/10 rounded-full transition-colors"
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
              className="md:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                          <Input type="email" placeholder="you@example.com" {...field} />
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
                          <Input placeholder="Subject" {...field} />
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
                          <Textarea rows={6} placeholder="Your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" onClick={openEmailClient}>
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
