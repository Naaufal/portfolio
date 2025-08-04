"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, User, Briefcase, Palette, Mail, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/#about", label: "About", icon: <User className="w-4 h-4" /> },
    { href: "/#skills", label: "Skills", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/#services", label: "services", icon: <Palette className="w-4 h-4" /> },
    { href: "/gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4" /> },
    { href: "/#contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-stone-950/95 backdrop-blur-sm border-b border-stone-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-stone-100 hover:text-amber-600 transition-colors duration-300"
          >
            N.naaufal<span className="text-amber-600">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-stone-300 hover:text-amber-600 transition-colors duration-300 flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-stone-300 hover:text-amber-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-stone-800">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-stone-300 hover:text-amber-600 hover:bg-stone-900 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
