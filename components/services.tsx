"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brush, PenTool, Palette, Clock, Star, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("services")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: <Brush className="w-8 h-8" />,
      title: "Headshot Vector Art",
      description: "Turn your close-up photo into a bold, expressive vector headshot with crisp details and stylized shading.",
      features: ["High-resolution output", "2x revisions", "Source files included",],
      price: "Starting from $5",
      duration: "1-2 days",
      color: "from-amber-900 to-stone-800",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Half Body Vector Art",
      description: "Stylized half-body vector portraits with artistic color tones and clean proportions—perfect for profile pictures or prints.",
      features: ["High-resolutin output", "3x revision", "Professional editing"],
      price: "Starting from $7",
      duration: "1-2 days",
      color: "from-amber-900 to-stone-800",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Full Body Vector Art",
      description: "Dynamic full-body vector illustrations with your preferred pose, outfit, and background.",
      features: ["High-resolution output", "3x revision", "Source files included"],
      price: "Starting from $10",
      duration: "1-2 days",
      color: "from-amber-900 to-stone-800",
    },
  ]

  return (
    <section id="services" className="py-20 bg-stone-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-amber-600/5 via-orange-600/3 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-yellow-600/5 via-orange-600/3 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-4xl font-bold text-stone-100 mb-4">
              Services & Pricing
              <Star className="inline-block ml-3 w-8 h-8 text-amber-600 animate-pulse" />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 mx-auto rounded-full mb-6" />
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Professional services tailored to bring your creative vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card className="bg-stone-900 border-stone-700 hover:border-amber-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-600/10 group h-full">
                  <CardHeader>
                    <div
                      className={`text-amber-600 mb-4 p-3 rounded-full bg-gradient-to-r ${service.color} bg-opacity-10 w-fit`}
                    >
                      {service.icon}
                    </div>
                    <CardTitle className="text-stone-100 group-hover:text-amber-600 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <p className="text-stone-400 group-hover:text-stone-300 transition-colors duration-300">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <h4 className="text-stone-100 font-semibold mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-stone-400 text-sm">
                            <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                            {service.price}
                          </div>
                          <div className="flex items-center text-stone-400 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-stone-950 transition-all duration-300 group-hover:scale-105"
                        asChild
                      >
                        <a
                          href="mailto:officialnaufalart@gmail.com?subject=Service Inquiry - Vector Art Commission"
                          onClick={(e) => {
                            e.preventDefault()
                            const subject = `Service Inquiry - ${service.title}`
                            const body = `Hi Naufal,%0D%0A%0D%0AI'm interested in your ${service.title} service.%0D%0A%0D%0APlease let me know more details about:%0D%0A- Pricing%0D%0A- Timeline%0D%0A- Process%0D%0A%0D%0AThank you!`
                            window.location.href = `mailto:${atob("b2ZmaWNpYWxuYXVmYWxhcnRAZ21haWwuY29t")}?subject=${subject}&body=${body}`
                          }}
                        >
                          Get Quote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-stone-800 rounded-2xl p-8 border border-stone-700">
              <h3 className="text-2xl font-bold text-stone-100 mb-4">Custom Projects</h3>
              <p className="text-stone-400 mb-6 max-w-2xl mx-auto">
                Have a unique project in mind? Let's discuss your requirements and create something amazing together.
              </p>
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-stone-950 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a
                  href="https://instagram.com/n.naaufal"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(atob("aHR0cHM6Ly9pbnN0YWdyYW0uY29tL24ubmFhdWZhbA=="), "_blank")
                  }}
                >
                  Discuss Custom Project
                </a>

              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
