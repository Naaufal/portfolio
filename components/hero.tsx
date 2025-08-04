"use client"

import { Github, Instagram, Mail, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"
import TypingAnimation from "@/components/typing-animation"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-transparent to-orange-600/5 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
          }}
        />

        {/* Enhanced Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-40 ${
              i % 4 === 0
                ? "bg-amber-600"
                : i % 4 === 1
                  ? "bg-orange-600"
                  : i % 4 === 2
                    ? "bg-yellow-600"
                    : "bg-amber-500"
            }`}
            style={{
              left: `${15 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 30}%`,
              transform: `translate(${(mousePosition.x - 50) * (0.02 + i * 0.01)}px, ${(mousePosition.y - 50) * (0.02 + i * 0.01)}px)`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Enhanced Geometric Shapes */}
        <div 
          className="absolute bottom-20 right-10 w-24 h-24 border border-orange-600/30 rotate-12 transition-transform duration-1000"
          style={{
            transform: `rotate(${12 + (mousePosition.x - 50) * 0.1}deg) translate(${(mousePosition.x - 50) * -0.05}px, ${(mousePosition.y - 50) * -0.05}px)`,
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <div
          className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-r from-yellow-600/20 to-transparent rounded-full transition-transform duration-1000"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.03}px, ${(mousePosition.y - 50) * 0.03}px)`,
            animation: 'bounce 3s ease-in-out infinite 1s'
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Title with Stagger Animation */}
          <div
            className={`transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h3 className="text-sm md:text-base text-stone-300 mb-2 ml-1">
              Hi, I&apos;m
            </h3>
            <h1 className="text-5xl md:text-7xl font-bold text-stone-100 mb-6 relative">
              <span 
                className={`inline-block hover:scale-110 transition-all duration-300 ${isLoaded ? 'animate-fadeInUp' : ''}`}
                style={{ animationDelay: '0.1s' }}
              >
                Muhammad
              </span>{" "}
              <span 
                className={`inline-block hover:scale-110 transition-all duration-300 ${isLoaded ? 'animate-fadeInUp' : ''}`}
                style={{ animationDelay: '0.2s' }}
              >
                Naufal
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent relative">
                <span 
                  className={`inline-block hover:scale-110 transition-all duration-300 ${isLoaded ? 'animate-fadeInUp' : ''}`}
                  style={{ animationDelay: '0.3s' }}
                >
                  Ali
                </span>{" "}
                <span 
                  className={`inline-block hover:scale-110 transition-all duration-300 ${isLoaded ? 'animate-fadeInUp' : ''}`}
                  style={{ animationDelay: '0.4s' }}
                >
                  Akbar
                </span>
                <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-amber-600 animate-pulse" />
              </span>
            </h1>
          </div>

          {/* Enhanced Typing Effect */}
          <div
            className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-xl md:text-2xl text-stone-300 mb-8">
              <span className="text-stone-400">I'm a </span>
              <TypingAnimation
                texts={["Digital Illustrator..", "Visual Wanderer..", "Backend Developer.."]}
                speed={100}
                deleteSpeed={75}
                pauseTime={1500}
              />
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Menggabungkan logika dan estetika lewat kode, seni vektor, dan lensa kamera 
            </p>
          </div>

          {/* Enhanced Interactive Buttons */}
          <div
            className={`flex justify-center gap-4 mb-12 transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Button
              variant="outline"
              size="lg"
              className="group bg-transparent border-amber-600 text-amber-600 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 hover:text-stone-950 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25 relative overflow-hidden"
              asChild
            >
              <a
                href="mailto:b2ZmaWNpYWxuYXVmYWxhcnRAZ21haWwuY29t"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = "mailto:" + atob("b2ZmaWNpYWxuYXVmYWxhcnRAZ21haWwuY29t")
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                <Mail className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Contact Me</span>
              </a>
            </Button>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 hover:from-orange-600 hover:to-yellow-600 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-600/25 relative overflow-hidden"
              asChild
            >
              <Link href="/gallery">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-orange-700/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10">View My Gallery</span>
              </Link>
            </Button>
          </div>

          {/* Enhanced Social Links */}
          <div
            className={`flex justify-center gap-6 transition-all duration-1000 delay-900 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <a
              href="https://github.com/naaufal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-600 transition-all duration-300 hover:scale-125 hover:-translate-y-2 transform-gpu relative group"
            >
              <Github className="w-6 h-6" />
              <div className="absolute inset-0 bg-amber-600/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10" />
            </a>
            <a
              href="https://instagram.com/n.naaufal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-orange-600 transition-all duration-300 hover:scale-125 hover:-translate-y-2 transform-gpu relative group"
            >
              <Instagram className="w-6 h-6" />
              <div className="absolute inset-0 bg-orange-600/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10" />
            </a>
            <a
              href="mailto:officialnaufalart@gmail.com"
              className="text-stone-400 hover:text-yellow-600 transition-all duration-300 hover:scale-125 hover:-translate-y-2 transform-gpu relative group"
            >
              <Mail className="w-6 h-6" />
              <div className="absolute inset-0 bg-yellow-600/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10" />
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-stone-400 hover:text-orange-600 transition-all duration-300 hover:scale-110 group"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            Scroll Down
          </span>
          <ChevronDown className="w-8 h-8 animate-bounce group-hover:animate-pulse" />
        </div>
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}