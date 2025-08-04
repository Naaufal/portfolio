"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Camera, Code, Star, Zap, Target } from "lucide-react"
import { useState, useEffect } from "react"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("skills")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const skills = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Vector Art",
      description:
        "Mengubah foto menjadi vector art yang detail dan berkualitas tinggi dengan teknik tracing profesional",
      tools: ["Infinite Design", "Photoshop", "Photo Tracing", "Digital Art"],
      level: 95,
      projects: "25+",
      accent: "from-amber-600 to-orange-600",
      progressColor: "from-amber-500 via-orange-500 to-yellow-500",
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(217, 119, 6, 0.1) 0%, transparent 50%)",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photography",
      description: "Mengabadikan keindahan dengan komposisi dan pencahayaan yang tepat untuk hasil yang memukau",
      tools: ["Landscape Photography", "Composition", "Colour Correction", "Post Processing"],
      level: 65,
      projects: "50+",
      accent: "from-orange-600 to-yellow-600",
      progressColor: "from-orange-500 via-yellow-500 to-amber-500",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Membangun aplikasi web yang modern, responsive, dan user-friendly dengan teknologi terkini",
      tools: ["React", "PHP", "Code Igniter 4", "Bootstrap", "Tailwind CSS"],
      level: 80,
      projects: "3+",
      accent: "from-stone-600 to-amber-700",
      progressColor: "from-stone-500 via-amber-600 to-orange-600",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(120, 113, 108, 0.1) 0%, transparent 50%)",
    },
  ]

  return (
    <section id="skills" className="py-20 bg-stone-950 relative overflow-hidden">
      {/* Animated Background */}
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
              Skills & Expertise
              <Zap className="inline-block ml-3 w-8 h-8 text-orange-600 animate-pulse" />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 mx-auto rounded-full mb-6" />
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Kombinasi kreativitas dan teknologi untuk menciptakan solusi yang inovatif
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card
                  className="bg-stone-900 border-stone-700 hover:border-orange-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-600/10 group cursor-pointer h-full relative overflow-hidden"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: skill.bgPattern }}
                  />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`text-amber-600 group-hover:scale-110 transition-transform duration-300 p-3 rounded-full bg-stone-950`}
                      >
                        {skill.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-stone-400 text-sm">Projects</div>
                        <div className="text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text font-bold">
                          {skill.projects}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-stone-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                      {skill.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-stone-300 mb-6 leading-relaxed group-hover:text-stone-100 transition-colors duration-300">
                      {skill.description}
                    </p>

                    {/* Skill Level Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-stone-400 text-sm">Skill Level</span>
                        <span className="text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-stone-800 rounded-full h-3 overflow-hidden border border-stone-700">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.progressColor} transition-all duration-1000 ease-out shadow-lg`}
                          style={{
                            width: hoveredSkill === index ? `${skill.level}%` : "0%",
                            transitionDelay: hoveredSkill === index ? "200ms" : "0ms",
                            boxShadow: hoveredSkill === index ? "0 0 15px rgba(245, 158, 11, 0.6)" : "none",
                          }}
                        />
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {skill.tools.map((tool, toolIndex) => (
                        <span
                          key={toolIndex}
                          className="px-3 py-1 bg-stone-800 text-amber-600 text-sm rounded-full border border-stone-700 group-hover:border-orange-600 group-hover:bg-stone-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300 hover:scale-105"
                          style={{
                            transitionDelay: `${toolIndex * 50}ms`,
                            transform: hoveredSkill === index ? "translateY(-2px)" : "translateY(0)",
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Floating Stars */}
                    {hoveredSkill === index && (
                      <div className="absolute top-4 right-4">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 absolute animate-ping ${
                              i === 0 ? "text-amber-400" : i === 1 ? "text-orange-400" : "text-yellow-400"
                            }`}
                            style={{
                              animationDelay: `${i * 0.2}s`,
                              left: `${i * 8}px`,
                              top: `${i * 6}px`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 rounded-full border border-stone-700 hover:border-orange-600 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <Target className="w-5 h-5 text-orange-600 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-stone-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                Ready to collaborate? Let's create something amazing!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
