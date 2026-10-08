export type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  year: string
  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: 5,
    title: "School Management",
    description: "A full-stack school operations platform built with Next.js, Spring Boot, and MySQL.",
    image: "/SchoolManagement.png",
    tags: ["Next.js", "Spring Boot", "MySQL"],
    category: "Full Stack",
    year: "2025",
  },
  {
    id: 7,
    title: "Bus Mini App Booking",
    description: "A mobile-first booking flow for route search, schedules, seat selection, and bus tickets.",
    image: "/BusBookingMiniApp.avif",
    tags: ["Mini App", "Spring Boot API", "MySQL"],
    category: "Mobile Application",
    year: "2025",
  },
  {
    id: 6,
    title: "VireakBuntham Booking System",
    description: "A web reservation platform for intercity routes, passenger bookings, and travel operations.",
    image: "/BusBookingSystem.png",
    tags: ["Spring Boot API", "MySQL"],
    category: "Web Development",
    year: "2023",
    liveUrl: "https://qavetwebbus.udaya-tech.com/",
  },
  {
    id: 1,
    title: "Wedding Tracker",
    description: "A Windows application for organizing wedding planning, logistics, and operational tasks.",
    image: "/WeddingTracker.png",
    tags: ["C#", "SQL Server"],
    category: "Windows Application",
    year: "2023",
    githubUrl: "https://github.com/ouknhastev99/SystemWedding",
  },
  {
    id: 3,
    title: "Sale Inventory",
    description: "An inventory and sales management system for products, transactions, and business reporting.",
    image: "/Inventory.png",
    tags: ["C#", "SQL Server"],
    category: "Data Management",
    year: "2023",
    githubUrl: "https://github.com/NangDalet/Sale_Inventory",
  },
  {
    id: 4,
    title: "Stock Management",
    description: "A responsive stock-tracking platform for inventory visibility and day-to-day operations.",
    image: "/StockManagement.png",
    tags: ["Laravel", "MySQL", "JavaScript", "CSS"],
    category: "Web Development",
    year: "2022",
    githubUrl: "https://github.com/ouknhastev99/stock",
  },
  {
    id: 2,
    title: "Student Register",
    description: "A web-based school management system for student data and administrative workflows.",
    image: "/StuentRegister.png",
    tags: ["ASP.NET Core MVC", "SQL Server", "jQuery", "Bootstrap"],
    category: "Web Development",
    year: "2021",
    githubUrl: "https://github.com/NangDalet/SchoolManagement",
  },
]

