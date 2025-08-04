"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Users, Star, Rocket } from "lucide-react"
import { useState, useEffect } from "react"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("projects")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: "Narria",
      subtitle: "Novel Reading Platform",
      description:
        "Website baca novel online yang dibangun dengan CodeIgniter 4. Platform yang memungkinkan pengguna untuk membaca novel secara online dengan interface yang user-friendly.",
      tech: ["CodeIgniter 4", "PHP", "MySQL", "Bootstrap", "Tailwind CSS"],
      image: "/images/narria.png",
      github: "https://github.com/naaufal/narria",
      demo: "https://narria-demo.vercel.app", // Ganti dengan link demo asli atau hapus jika tidak ada
      status: "Completed",
      year: "2024",
      users: "100+",
      features: ["Role-Based Access Control", "Reading Progress", "Bookmark System", "Admin Dashboard"],
      gradient: "from-amber-600 to-amber-800",
      hasDemo: false, // Set true jika ada demo live
    },
  ]

  return (
    <section id="projects" className="py-20 bg-stone-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-amber-600/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-amber-600/3 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-4xl font-bold text-stone-100 mb-4">
              Featured Projects
              <Rocket className="inline-block ml-3 w-8 h-8 text-amber-600 animate-bounce" />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-600 to-purple-600 mx-auto rounded-full mb-6" />
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Showcase of my latest work and creative solutions
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card
                  className="bg-stone-800 border-stone-700 overflow-hidden hover:border-amber-600 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/10 group"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay with Stats */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-stone-800/80 rounded-lg p-2 backdrop-blur-sm">
                              <Calendar className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                              <div className="text-stone-100 text-sm font-semibold">{project.year}</div>
                            </div>
                            <div className="bg-stone-800/80 rounded-lg p-2 backdrop-blur-sm">
                              <Users className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                              <div className="text-stone-100 text-sm font-semibold">{project.users}</div>
                            </div>
                            <div className="bg-stone-800/80 rounded-lg p-2 backdrop-blur-sm">
                              <Star className="w-4 h-4 text-amber-700 mx-auto mb-1" />
                              <div className="text-stone-100 text-sm font-semibold">{project.status}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.gradient} text-white shadow-lg`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 relative">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-stone-100 text-2xl group-hover:text-amber-600 transition-colors duration-300">
                            {project.title}
                          </CardTitle>
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.gradient} animate-pulse`} />
                        </div>
                        <p className="text-amber-600 font-medium">{project.subtitle}</p>
                      </CardHeader>

                      <CardContent className="p-0">
                        <p className="text-stone-300 mb-6 leading-relaxed group-hover:text-stone-100 transition-colors duration-300">
                          {project.description}
                        </p>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="text-stone-100 font-semibold mb-3">Key Features:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {project.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center text-stone-400 text-sm hover:text-amber-600 transition-colors duration-300"
                                style={{
                                  transitionDelay: hoveredProject === index ? `${featureIndex * 100}ms` : "0ms",
                                }}
                              >
                                <div className="w-2 h-2 bg-amber-600 rounded-full mr-2 animate-pulse" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-stone-700 text-amber-600 text-sm rounded-full border border-stone-600 hover:border-amber-600 hover:scale-105 transition-all duration-300"
                              style={{
                                transitionDelay: hoveredProject === index ? `${techIndex * 50}ms` : "0ms",
                                transform: hoveredProject === index ? "translateY(-2px)" : "translateY(0)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            className="bg-transparent border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-stone-950 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              View Code
                            </a>
                          </Button>

                          {project.hasDemo ? (
                            <Button
                              className="bg-amber-600 text-stone-950 hover:bg-amber-700 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25"
                              asChild
                            >
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          ) : (
                            <Button className="bg-stone-700 text-stone-400 cursor-not-allowed" disabled>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo Coming Soon
                            </Button>
                          )}
                        </div>
                      </CardContent>

                      {/* Floating Elements */}
                      {hoveredProject === index && (
                        <div className="absolute top-4 right-4">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-amber-400 rounded-full absolute animate-ping"
                              style={{
                                animationDelay: `${i * 0.3}s`,
                                left: `${i * 10}px`,
                                top: `${i * 8}px`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* More Projects Section */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-stone-800 rounded-2xl p-8 border border-stone-700 hover:border-amber-600 transition-all duration-300 hover:scale-105 group">
              <h3 className="text-2xl font-bold text-stone-100 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                More Projects Coming Soon...
              </h3>
              <p className="text-stone-400 mb-6 group-hover:text-stone-300 transition-colors duration-300">
                I'm constantly working on new and exciting projects. Stay tuned for updates!
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-stone-600 text-stone-400 hover:bg-stone-700 hover:text-stone-100 hover:border-amber-600 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://github.com/naaufal" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View All on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
