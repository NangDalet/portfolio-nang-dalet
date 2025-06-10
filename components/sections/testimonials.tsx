"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechInnovate",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "Working with this developer was an absolute pleasure. They delivered a beautiful, functional website that exceeded our expectations. Their attention to detail and commitment to quality was evident throughout the project."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "StartupVision",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "We hired this developer to rebuild our company website, and the results were outstanding. They have a unique ability to translate business requirements into elegant, user-friendly designs. Their technical skills are matched by their excellent communication."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthBrand",
    avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "The wedding tracking they built for us has significantly increased our online sales. Their deep understanding of both design and functionality created a seamless shopping experience for our customers. I highly recommend their services."
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO",
    company: "EnterpriseWave",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "Their technical expertise is impressive. They helped us solve complex problems with elegant solutions, and their code is clean, well-documented, and maintainable. A true professional who delivers on time and on budget."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
              </p>
            </motion.div>
          </div>
          
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background">
                          <img 
                            src={testimonials[currentIndex].avatar} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full">
                          <Quote className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <p className="text-lg mb-6 italic">"{testimonials[currentIndex].text}"</p>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                        <p className="text-muted-foreground">
                          {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <div className="flex justify-center mt-8 gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {testimonials.map((_, index) => (
                <Button 
                  key={index}
                  variant={index === currentIndex ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentIndex(index)}
                  className="w-3 h-3 rounded-full p-0 min-w-0"
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </Button>
              ))}
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
