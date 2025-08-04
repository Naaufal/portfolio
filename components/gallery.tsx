"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Camera, Palette, Heart, Share, Info, Eye, Download, Maximize, Minimize } from "lucide-react"
import Navigation from "@/components/navigation"

interface GalleryItem {
  id: number
  src: string
  title: string
  category: "vector" | "photography"
  likes: number
  uploadDate: Date
  resolution?: string
  tools?: string
  width?: number
  height?: number
  featured?: boolean
}

// Auto-ID Generator System
let itemId = 1
const createItem = (data: Omit<GalleryItem, 'id'>) => ({ id: itemId++, ...data })

// Gallery Items Data - Mudah untuk maintenance, tinggal tambah/edit tanpa khawatir ID
const GALLERY_ITEMS_DATA = [

  createItem({
    src: "/images/vector/vector1.jpg",
    title: "Portrait Vector Art - Azizi Asadel",
    category: "vector",
    likes: 45,
    uploadDate: new Date(2025, 6, 27),
    resolution: "785 x 1400 px",
    tools: "Infinite Design, Pen Tool, Pixellab",
    width: 785,
    height: 1400,
  }),


  createItem({
    src: "/images/fotografi/fotografi1.jpg",
    title: "Golden Hour Portrait",
    category: "photography",
    likes: 67,
    uploadDate: new Date(2025, 6, 25),
    resolution: "4096 x 2731 px",
    tools: "Canon EOS R5, Lightroom, Natural Lighting",
    width: 400,
    height: 2675,
  }),

  createItem({
    src: "/images/vector/vector2.jpg",
    title: "Portrait Vector Art - Hijab Style",
    category: "vector",
    likes: 52,
    uploadDate: new Date(2025, 6, 23),
    resolution: "2002 x 1455 px",
    tools: "Infinite Design, Pen Tool, Pixellab",
    width: 2002,
    height: 1455
  }),

  // Photography
  createItem({
    src: "/images/fotografi/fotografi2.jpg",
    title: "Urban Architecture Study",
    category: "photography",
    likes: 43,
    uploadDate: new Date(2025, 6, 20),
    resolution: "3840 x 2560 px",
    tools: "DSLR Camera, Adobe Lightroom",
    width: 400,
    height: 267
  }),


  createItem({
    src: "/images/vector/vector3.jpg",
    title: "Portrait Vector Art - Alyssa Ananta",
    category: "vector",
    likes: 67,
    uploadDate: new Date(2025, 6, 16),
    resolution: "843 x 1138 px",
    tools: "Adobe Illustrator, Photoshop, Digital Effects",
    width: 843,
    height: 1138
  }),


  createItem({
    src: "/images/fotografi/fotografi3.jpg",
    title: "Sunset Landscape",
    category: "photography",
    likes: 38,
    uploadDate: new Date(2025, 6, 12),
    resolution: "2048 x 1536 px",
    tools: "Photoshop, Color Theory, Digital Art",
    width: 400,
    height: 300
  }),

  createItem({
    src: "/images/vector/vector4.jpg",
    title: "Robert Downey Jr Portrait",
    category: "vector",
    likes: 58,
    uploadDate: new Date(2025, 5, 15),
    resolution: "3000 x 4000 px",
    tools: "Digital Painting, Photoshop, Color Grading",
    width: 400,
    height: 533
  }),

  createItem({
    src: "/images/fotografi/fotografi4.jpg",
    title: "Street Photography",
    category: "photography",
    likes: 42,
    uploadDate: new Date(2025, 5, 10),
    resolution: "2048 x 1536 px",
    tools: "Wide Angle Lens, HDR Processing",
    width: 400,
    height: 300
  }),


  createItem({
    src: "/images/vector/vector5.jpg",
    title: "Abstract Vector Design",
    category: "vector",
    likes: 56,
    uploadDate: new Date(2025, 5, 5),
    resolution: "2048 x 1536 px",
    tools: "Vector Art, Abstract Design",
    width: 400,
    height: 300
  }),

  createItem({
    src: "/images/fotografi/fotografi5.jpg",
    title: "Natural Landscape",
    category: "photography",
    likes: 51,
    uploadDate: new Date(2025, 4, 30),
    resolution: "2048 x 1536 px",
    tools: "Drone Photography, Color Grading",
    width: 400,
    height: 300
  }),


  createItem({
    src: "/images/fotografi/fotografi6.jpg",
    title: "Urban Portrait",
    category: "photography",
    likes: 29,
    uploadDate: new Date(2025, 4, 25),
    resolution: "2048 x 1536 px",
    tools: "Street Photography, Natural Light",
    width: 400,
    height: 300
  }),


  createItem({
    src: "/images/fotografi/fotografi7.jpg",
    title: "Minimalist Composition", 
    category: "photography",
    likes: 47,
    uploadDate: new Date(2025, 4, 20),
    resolution: "2048 x 1536 px",
    tools: "Composition Study, Lightroom",
    width: 400,
    height: 300
  }),

  
  createItem({
    src: "/images/fotografi/fotografi8.jpg",
    title: "Street Art Documentation",
    category: "photography",
    likes: 35,
    uploadDate: new Date(2025, 4, 15),
    resolution: "2048 x 1536 px",
    tools: "Documentary Photography, Color Pop",
    width: 400,
    height: 300
  }),


  createItem({
    src: "/images/fotografi/fotografi9.jpg",
    title: "Nature Macro",
    category: "photography",
    likes: 61,
    uploadDate: new Date(2025, 4, 10),
    resolution: "2048 x 1536 px",
    tools: "Macro Lens, Focus Stacking",
    width: 400,
    height: 300
  }),


  createItem({
    src: "/images/fotografi/fotografi10.jpg",
    title: "Sunset Silhouette",
    category: "photography",
    likes: 73,
    uploadDate: new Date(2025, 4, 5),
    resolution: "2048 x 1536 px",
    tools: "Golden Hour, Silhouette Technique",
    width: 400,
    height: 300
  }),


  createItem({
    src: "/images/fotografi/fotografi11.jpg",
    title: "Abstract Patterns",
    category: "photography",
    likes: 44,
    uploadDate: new Date(2025, 3, 30),
    resolution: "2048 x 1536 px",
    tools: "Pattern Recognition, Geometric Study",
    width: 400,
    height: 300
  }),

  createItem({
    src: "/images/fotografi/fotografi12.jpg",
    title: "Motion Blur Study",
    category: "photography",
    likes: 33,
    uploadDate: new Date(2025, 3, 25),
    resolution: "2048 x 1536 px",
    tools: "Long Exposure, Motion Capture",
    width: 400,
    height: 300
  }),
]

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const createAlternatingPattern = (items: GalleryItem[]): GalleryItem[] => {
  const vectors = items.filter(item => item.category === 'vector')
  const photography = items.filter(item => item.category === 'photography')
  
  // Sort each category by date (newest first)
  const sortedVectors = vectors.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
  const sortedPhotography = photography.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
  
  const result: GalleryItem[] = []
  const maxLength = Math.max(sortedVectors.length, sortedPhotography.length)
  
  // Alternate between vector and photography, starting with featured items
  const featuredItems = items.filter(item => item.featured).sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
  const nonFeaturedVectors = sortedVectors.filter(item => !item.featured)
  const nonFeaturedPhotography = sortedPhotography.filter(item => !item.featured)
  
  // Add featured items first
  result.push(...featuredItems)
  
  // Then alternate the rest
  let vectorIndex = 0
  let photoIndex = 0
  let shouldAddVector = true // Start with vector after featured items
  
  while (vectorIndex < nonFeaturedVectors.length || photoIndex < nonFeaturedPhotography.length) {
    if (shouldAddVector && vectorIndex < nonFeaturedVectors.length) {
      result.push(nonFeaturedVectors[vectorIndex])
      vectorIndex++
    } else if (!shouldAddVector && photoIndex < nonFeaturedPhotography.length) {
      result.push(nonFeaturedPhotography[photoIndex])
      photoIndex++
    } else if (vectorIndex < nonFeaturedVectors.length) {
      result.push(nonFeaturedVectors[vectorIndex])
      vectorIndex++
    } else if (photoIndex < nonFeaturedPhotography.length) {
      result.push(nonFeaturedPhotography[photoIndex])
      photoIndex++
    }
    
    shouldAddVector = !shouldAddVector
  }
  
  return result
}

// Final Gallery Items dengan pattern alternating
const galleryItems = createAlternatingPattern(GALLERY_ITEMS_DATA)

// Skeleton Component
const ImageSkeleton = ({ aspectRatio = "auto" }: { aspectRatio?: string }) => (
  <div 
    className="relative overflow-hidden rounded-xl border border-stone-700 bg-stone-800"
    style={{ aspectRatio }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-600/50 to-transparent animate-shimmer" 
           style={{
             backgroundSize: '200% 100%',
             animation: 'shimmer 2s infinite linear'
           }} />
    </div>
    
    {/* Skeleton content */}
    <div className="absolute bottom-4 left-4 right-4">
      <div className="h-3 bg-stone-600 rounded mb-2 w-3/4"></div>
      <div className="h-2 bg-stone-700 rounded w-1/2"></div>
    </div>
  </div>
)

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    observer.observe(target)
    return () => observer.unobserve(target)
  }, [])

  return [targetRef, isIntersecting] as const
}

// Gallery Item Component
const GalleryItemComponent = ({ 
  item, 
  index, 
  onClick 
}: { 
  item: GalleryItem
  index: number
  onClick: () => void 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [targetRef, isVisible] = useIntersectionObserver()
  const [shouldLoad, setShouldLoad] = useState(index < 6) // Load first 6 immediately
  
  useEffect(() => {
    if (isVisible && !shouldLoad) {
      // Add small delay for staggered effect
      const timer = setTimeout(() => {
        setShouldLoad(true)
      }, index * 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible, shouldLoad, index])

  return (
    <div
      ref={targetRef}
      className={`break-inside-avoid cursor-pointer group transition-all duration-700 ${
        shouldLoad && imageLoaded 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-4'
      } ${item.featured ? 'ring-2 ring-amber-600/30 ring-offset-2 ring-offset-stone-950' : ''}`}
      onClick={onClick}
      style={{
        transitionDelay: `${index * 50}ms` // Staggered animation
      }}
    >
      <div className={`relative overflow-hidden rounded-xl border transition-all duration-500 hover:shadow-2xl group-hover:scale-[1.02] ${
        item.featured 
          ? 'border-amber-600/50 hover:border-amber-600 hover:shadow-amber-600/20' 
          : 'border-stone-700 hover:border-amber-600 hover:shadow-amber-600/10'
      }`}>
        
        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        
        {/* Show skeleton while loading */}
        {!imageLoaded && shouldLoad && (
          <div className="absolute inset-0 z-10">
            <ImageSkeleton />
          </div>
        )}
        
        {/* Show static skeleton if not in viewport yet */}
        {!shouldLoad && (
          <ImageSkeleton aspectRatio={item.height && item.width ? `${item.width}/${item.height}` : "4/5"} />
        )}

        {/* Actual Image */}
        {shouldLoad && (
          <div className="relative">
            <Image
              src={item.src}
              alt={item.title}
              width={item.width || 400}
              height={item.height || 500}
              className={`w-full h-auto object-cover group-hover:scale-110 transition-all duration-700 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading={index < 6 ? "eager" : "lazy"}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWWRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            
            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 flex items-end ${
              imageLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
            }`}>
              <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-orange-200 mb-2 capitalize flex items-center gap-1">
                  {item.category === 'vector' ? <Palette className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                  {item.category === 'vector' ? 'Vector Art' : 'Photography'}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Heart className="w-3 h-3" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<"all" | "vector" | "photography">("all")
  const [showInfo, setShowInfo] = useState(true)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  // Effect to handle URL hash and auto-open image
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash) {
        const imageId = parseInt(hash)
        const foundImage = galleryItems.find(item => item.id === imageId)
        if (foundImage) {
          setSelectedImage(foundImage)
        }
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    
    // Set initial load complete after a short delay
    const timer = setTimeout(() => {
      setInitialLoadComplete(true)
    }, 500)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      clearTimeout(timer)
    }
  }, [])

  // Update page title based on selected image
  useEffect(() => {
    if (selectedImage) {
      document.title = `${selectedImage.title} - Gallery | Naaufal Portfolio`
    } else {
      document.title = "Gallery - Naaufal Portfolio"
    }
  }, [selectedImage])

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Download image function
  const downloadImage = (item: GalleryItem) => {
    const link = document.createElement('a')
    link.href = item.src
    link.download = `${item.title.replace(/\s+/g, '_')}.jpg`
    link.click()
  }

  // Update URL hash when image is selected/deselected
  useEffect(() => {
    if (selectedImage) {
      window.history.pushState(null, '', `#${selectedImage.id}`)
    } else {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname)
      }
    }
  }, [selectedImage])

  // Function to calculate relative time
  const getRelativeTime = (uploadDate: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - uploadDate.getTime()
    const diffInSeconds = Math.floor(diffInMs / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInWeeks = Math.floor(diffInDays / 7)
    const diffInMonths = Math.floor(diffInDays / 30)

    if (diffInSeconds < 60) return "just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`
    if (diffInMonths < 1) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    
    return uploadDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") navigateImage("prev")
    if (e.key === "ArrowRight") navigateImage("next")
    if (e.key === "Escape") setSelectedImage(null)
    if (e.key === "i" || e.key === "I") setShowInfo(!showInfo)
    if (e.key === "f" || e.key === "F") toggleFullscreen()
  }

  const handleShare = (item: GalleryItem) => {
    setShowShareDialog(true)
  }

  const handleCopyLink = async () => {
    try {
      const shareUrl = `${window.location.origin}${window.location.pathname}#${selectedImage?.id}`
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
        setShowShareDialog(false)
      }, 1500)
    } catch (error) {
      const textArea = document.createElement('textarea')
      textArea.value = `${window.location.origin}${window.location.pathname}#${selectedImage?.id}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
        setShowShareDialog(false)
      }, 1500)
    }
  }

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  const getCurrentIndex = () => {
    if (!selectedImage) return -1
    return filteredItems.findIndex((item) => item.id === selectedImage.id)
  }

  const navigateImage = (direction: "prev" | "next") => {
    const currentIndex = getCurrentIndex()
    if (currentIndex === -1) return

    let newIndex
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1
    }

    setSelectedImage(filteredItems[newIndex])
  }

  // Get category counts
  const vectorCount = galleryItems.filter(item => item.category === "vector").length
  const photographyCount = galleryItems.filter(item => item.category === "photography").length
  const featuredCount = galleryItems.filter(item => item.featured).length

  return (
    <>
      <Navigation />
      
      {/* Add custom CSS for shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>

      <div className="min-h-screen pt-20 relative overflow-hidden" style={{
        background: `
          radial-gradient(600px circle at 25% 25%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
          radial-gradient(500px circle at 75% 75%, rgba(249, 115, 22, 0.06) 0%, transparent 50%),
          linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #0c0a09 100%)
        `
      }}>
        {/* Subtle Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${
            initialLoadComplete ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-100">Gallery</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 mx-auto rounded-full mb-6" />
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Koleksi karya vector art dan fotografi yang telah saya buat dengan susunan alternating untuk variasi visual yang menarik
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 mt-6 text-sm text-stone-500">
              <span>{galleryItems.length} Total Works</span>
              <span>•</span>
              <span>{featuredCount} Featured</span>
              <span>•</span>
              <span>Mixed Layout</span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            initialLoadComplete ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-stone-600 text-stone-400 hover:border-amber-600 hover:text-amber-600"
              }
            >
              All Works ({galleryItems.length})
            </Button>
            <Button
              variant={filter === "vector" ? "default" : "outline"}
              onClick={() => setFilter("vector")}
              className={`flex items-center gap-2 ${filter === "vector" ? "bg-amber-600 hover:bg-amber-700" : "border-stone-600 text-stone-400 hover:border-amber-600 hover:text-amber-600"}`}
            >
              <Palette className="w-4 h-4" />
              Vector Art ({vectorCount})
            </Button>
            <Button
              variant={filter === "photography" ? "default" : "outline"}
              onClick={() => setFilter("photography")}
              className={`flex items-center gap-2 ${filter === "photography" ? "bg-amber-600 hover:bg-amber-700" : "border-stone-600 text-stone-400 hover:border-amber-600 hover:text-amber-600"}`}
            >
              <Camera className="w-4 h-4" />
              Photography ({photographyCount})
            </Button>
          </div>

          {/* Gallery Grid - Masonry Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <GalleryItemComponent
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg">No items found for this category.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-stone-800 mt-12 relative z-10">
          <p className="text-stone-500 text-sm">
            © 2025 Naaufal. All rights reserved. | Portfolio Gallery
          </p>
          <p className="text-stone-600 text-xs mt-1">
            Interested in my work? Let's create something amazing together.
          </p>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className={`fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Modal Container */}
            <div 
              className={`relative w-full bg-stone-950 rounded-xl overflow-hidden shadow-2xl ${
                isFullscreen 
                  ? 'max-w-none max-h-none h-full rounded-none' 
                  : 'max-w-5xl max-h-[90vh]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls Bar */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-stone-950 font-bold text-sm">N</span>
                  </div>
                  <span className="text-white font-medium">naaufal</span>
                  {selectedImage.featured && (
                    <span className="bg-amber-600 text-stone-950 text-xs font-bold px-2 py-1 rounded-full ml-2">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowInfo(!showInfo)
                    }}
                    title="Toggle info (Press I)"
                  >
                    {showInfo ? <Eye className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFullscreen()
                    }}
                    title="Toggle fullscreen"
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadImage(selectedImage)
                    }}
                    title="Download image"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(selectedImage)
                    }}
                    title="Share"
                  >
                    <Share className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Navigation Buttons */}
              {filteredItems.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage("prev")
                    }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage("next")
                    }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}

              {/* Main Image */}
              <div className={`flex items-center justify-center bg-black rounded-xl overflow-hidden ${
                isFullscreen ? 'rounded-none h-full' : ''
              }`} style={{ 
                height: isFullscreen 
                  ? '100vh' 
                  : showInfo 
                    ? 'calc(90vh - 140px)' 
                    : 'calc(90vh - 80px)' 
              }}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width={selectedImage.width || 800}
                  height={selectedImage.height || 600}
                  className="max-w-full max-h-full object-contain"
                  quality={95}
                  priority
                />          
              </div>

              {/* Bottom Info Panel */}
              {showInfo && !isFullscreen && (
                <div className="bg-stone-950 border-t border-stone-700 p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left: Main Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-stone-100 mb-2">{selectedImage.title}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-2 text-sm text-stone-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {selectedImage.likes} likes
                        </span>
                        <span>{getRelativeTime(selectedImage.uploadDate)}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize flex items-center gap-1 ${
                          selectedImage.category === "vector" 
                            ? "bg-purple-600/20 text-purple-400" 
                            : "bg-blue-600/20 text-blue-400"
                        }`}>
                          {selectedImage.category === "vector" ? <Palette className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                          {selectedImage.category === "vector" ? "Vector Art" : "Photography"}
                        </span>
                      </div>
                    </div>

                    {/* Right: Technical Info */}
                    <div className="flex flex-col md:items-end gap-1 text-sm text-stone-400">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">Resolution:</span>
                        <span className="text-stone-300">{selectedImage.resolution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">Tools:</span>
                        <span className="text-stone-300 md:text-right">{selectedImage.tools}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-stone-500">
                          {getCurrentIndex() + 1} of {filteredItems.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Instruction */}
              {!isFullscreen && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-stone-400 text-xs">
                  Press I to toggle info • ESC to close • ← → to navigate • F for fullscreen
                </div>
              )}
            </div>
          </div>
        )}

        {/* Share Dialog */}
        {showShareDialog && (
          <div 
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowShareDialog(false)}
          >
            <div 
              className="bg-stone-900 rounded-xl p-6 max-w-sm w-full border border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-stone-100 mb-4">Share this artwork</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={selectedImage?.src || "/placeholder.svg"}
                  alt={selectedImage?.title || ""}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-stone-200 font-medium text-sm">{selectedImage?.title}</p>
                  <p className="text-stone-400 text-xs capitalize">{selectedImage?.category}</p>
                </div>
              </div>

              <Button
                onClick={handleCopyLink}
                className="w-full bg-amber-600 hover:bg-amber-700 text-stone-950 font-medium py-3"
                disabled={copySuccess}
              >
                {copySuccess ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Link Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setShowShareDialog(false)}
                className="w-full mt-2 text-stone-400 hover:text-stone-200"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Gallery  