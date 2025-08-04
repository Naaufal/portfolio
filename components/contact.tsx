"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Instagram, Send, MessageCircle, Coffee } from "lucide-react"
import { useState, useEffect } from "react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("contact")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      subtitle: "Drop me a line",
      value: "officialnaufalart@gmail.com",
      href: "mailto:b2ZmaWNpYWxuYXVmYWxhcnRAZ21haWwuY29t",
      color: "from-amber-600 to-amber-800",
      description: "Best for project inquiries and collaborations",
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: "GitHub",
      subtitle: "Check my code",
      value: "github.com/naaufal",
      href: "https://github.com/naaufal",
      color: "from-stone-600 to-stone-800",
      description: "Explore my repositories and contributions",
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: "Instagram",
      subtitle: "See my art",
      value: "@n.naaufal",
      href: "https://instagram.com/n.naaufal",
      color: "from-amber-500 to-amber-700",
      description: "Follow for vector art and photography updates",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-stone-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-amber-600/3 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-l from-amber-600/2 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-600 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${15 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 35}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + (i % 2)}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-4xl font-bold text-stone-100 mb-4">
              Let's Work Together
              <Coffee className="inline-block ml-3 w-8 h-8 text-amber-600 animate-bounce" />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-600 to-purple-600 mx-auto rounded-full mb-6" />
            <p className="text-xl text-stone-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              Tertarik untuk berkolaborasi? Saya siap membantu mengubah ide Anda menjadi karya digital yang menakjubkan.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 rounded-full border border-stone-700">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-stone-400 text-sm">Available for new projects</span>
            </div>
          </div>

          {/* Contact Cards */}
          <div
            className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="bg-stone-900 border-stone-700 hover:border-amber-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-600/10 group cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardHeader className="relative z-10">
                  <div
                    className={`text-amber-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300 p-4 rounded-full bg-stone-950`}
                  >
                    {method.icon}
                  </div>
                  <CardTitle className="text-stone-100 group-hover:text-amber-600 transition-colors duration-300">
                    {method.title}
                  </CardTitle>
                  <p className="text-stone-400 text-sm group-hover:text-stone-300 transition-colors duration-300">
                    {method.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10">
                  <a
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-stone-300 hover:text-amber-600 transition-colors duration-300 font-medium block mb-3"
                  >
                    {method.value}
                  </a>
                  <p className="text-stone-500 text-xs group-hover:text-stone-400 transition-colors duration-300">
                    {method.description}
                  </p>
                </CardContent>

                {/* Hover Effect Particles */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400 rounded-full animate-ping"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-stone-800 rounded-2xl p-8 border border-stone-700 hover:border-amber-600 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
              <div className="relative z-10">
                <MessageCircle className="w-12 h-12 text-amber-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-stone-100 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                  Ready to Start Your Project?
                </h3>
                <p className="text-stone-400 mb-6 group-hover:text-stone-300 transition-colors duration-300 max-w-2xl mx-auto">
                  Mari diskusikan ide Anda! Saya akan membantu mewujudkan visi kreatif Anda dengan solusi yang tepat dan
                  berkualitas tinggi.
                </p>

                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-amber-600 text-stone-950 hover:bg-amber-700 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25"
                    asChild
                  >
                    <a
                      href="mailto:b2ZmaWNpYWxuYXVmYWxhcnRAZ21haWwuY29t"
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = "mailto:" + atob("b2ZmaWNpYWxuYXVmYWxhcnRAZ21haWwuY29t")
                      }}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Get In Touch
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-stone-600 text-stone-400 hover:bg-stone-700 hover:text-stone-100 hover:border-amber-600 hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <a href="https://github.com/naaufal" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      View Portfolio
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer
            className={`pt-8 border-t border-stone-800 transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-stone-400 hover:text-stone-300 transition-colors duration-300">
                © 2024 Muhammad Naufal Ali Akbar.
              </p>
              <div className="flex items-center gap-2 text-stone-500 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Bekasi, Indonesia</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}
