"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Code, Palette, Camera, Award } from "lucide-react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("about")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: <Palette className="w-6 h-6" />, label: "Vector Arts", value: "15+", color: "text-amber-600" },
    { icon: <Camera className="w-6 h-6" />, label: "Photos", value: "20+", color: "text-orange-600" },
    { icon: <Code className="w-6 h-6" />, label: "Projects", value: "5+", color: "text-yellow-600" },
    { icon: <Award className="w-6 h-6" />, label: "Experience", value: "3 Years+", color: "text-amber-500" },
  ]

  return (
    <section id="about" className="py-20 bg-stone-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl font-bold text-center text-stone-100 mb-12 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            About Me
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 mx-auto mt-4 rounded-full" />
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Profile Card with Hover Effect */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
              <Card className="bg-stone-800 border-stone-700 hover:border-orange-600 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-600/10 group">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                      <span className="text-6xl font-bold text-stone-950 z-10">N</span>
                      {/* Animated Ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-orange-400 opacity-0 group-hover:opacity-100 animate-ping" />
                    </div>
                    {/* Floating Icons */}
                    <div className="absolute top-4 right-4 text-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div
                      className="absolute bottom-4 left-4 text-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <Code className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content with Typewriter Effect */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="text-stone-300 text-lg leading-relaxed space-y-4">
                <p className="hover:text-stone-100 transition-colors duration-300">
                  Menggabungkan kreativitas visual dan <span className="text-orange-600 font-semibold">Logika pemrograman </span> 
                  adalah keunikan saya
                </p>
                <p className="hover:text-stone-100 transition-colors duration-300">
                  Saya percaya bahwa setiap wajah menyimpan cerita—dan melalui{" "}
                  <span className="text-amber-600 font-semibold">vector art</span>, saya mencoba menghidupkan kembali cerita itu dengan garis, warna, dan detail yang penuh makna.
                </p>
                <blockquote className="text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text font-medium italic border-l-4 border-orange-600 pl-4 hover:border-amber-400 transition-colors duration-300">
                  &quot;Karya terbaik lahir dari keseimbangan antara seni dan struktur.&quot;
                </blockquote>
              </div>

              {/* Interactive Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="bg-stone-800 p-4 rounded-lg border border-stone-700 hover:border-orange-600 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onMouseEnter={() => setActiveCard(1)}
                  onMouseLeave={() => setActiveCard(0)}
                >
                  <h4 className="text-orange-600 font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                    Education
                  </h4>
                  <p className="text-stone-300 text-sm group-hover:text-stone-100 transition-colors">
                    Teknik Informatika
                  </p>
                  <p className="text-stone-400 text-xs group-hover:text-stone-300 transition-colors">
                    Universitas Pelita Bangsa
                  </p>
                </div>
                <div
                  className="bg-stone-800 p-4 rounded-lg border border-stone-700 hover:border-yellow-600 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onMouseEnter={() => setActiveCard(2)}
                  onMouseLeave={() => setActiveCard(0)}
                >
                  <h4 className="text-yellow-600 font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                    Focus
                  </h4>
                  <p className="text-stone-300 text-sm group-hover:text-stone-100 transition-colors">Vector Art</p>
                  <p className="text-stone-400 text-xs group-hover:text-stone-300 transition-colors">Web Development</p>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-stone-800 rounded-lg border border-stone-700 hover:border-amber-600 transition-all duration-300 hover:scale-105 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-stone-100 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-stone-400 text-sm group-hover:text-stone-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
