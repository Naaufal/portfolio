import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import BackToTop from "@/components/back-to-top"
import Services from "@/components/services"
import { Analytics } from "@vercel/analytics/react" // ✅ Perbaikan di sini

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
      <BackToTop />
      <Analytics /> {/* ✅ Komponen tetap digunakan seperti biasa */}
    </main>
  )
}
