"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Camera, Palette, Heart, Share, Info, Eye, Download, Maximize, Minimize } from "lucide-react"
import Navigation from "@/components/navigation"

interface GalleryItem {
  id: number
  src: string
  title: string
  category: "vector" | "photography"
  description: string
  likes: number
  uploadDate: Date
  resolution?: string
  tools?: string
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<"all" | "vector" | "photography">("all")
  const [showInfo, setShowInfo] = useState(true)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [imageLoading, setImageLoading] = useState<number[]>([]) // Track loading images
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Effect to handle URL hash and auto-open image
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) // Remove the '#'
      if (hash) {
        const imageId = parseInt(hash)
        const foundImage = galleryItems.find(item => item.id === imageId)
        if (foundImage) {
          setSelectedImage(foundImage)
        }
      }
    }

    // Check hash on component mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
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

  // Handle image loading
  const handleImageLoad = (imageId: number) => {
    setImageLoading(prev => prev.filter(id => id !== imageId))
  }

  const handleImageLoadStart = (imageId: number) => {
    setImageLoading(prev => [...prev, imageId])
  }

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
      // Clear hash when modal is closed
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
    
    // If more than 1 month, show absolute date
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
      // Fallback for browsers that don't support clipboard API
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

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/images/vector/vector1.jpg",
      title: "Portrait Vector Art - Hijab Style",
      category: "vector",
      description: "",
      likes: 45,
      uploadDate: new Date(2025, 6, 27), // 3 days ago from July 30
      resolution: "2000 x 2400 px",
      tools: "Adobe Illustrator, Pen Tool, Gradient Mesh"
    },
    {
      id: 2,
      src: "/images/vector/vector2.jpg",
      title: "Portrait Vector Art - Alyssa",
      category: "vector",
      description: "",
      likes: 52,
      uploadDate: new Date(2025, 6, 23), // 1 week ago
      resolution: "1800 x 2200 px",
      tools: "Adobe Illustrator, Typography Design"
    },
    {
      id: 3,
      src: "/images/vector/vector3.jpg",
      title: "Electric Crack Portrait",
      category: "vector",
      description: "",
      likes: 67,
      uploadDate: new Date(2025, 6, 16), // 2 weeks ago
      resolution: "2400 x 2400 px",
      tools: "Adobe Illustrator, Photoshop, Digital Effects"
    },
    {
      id: 4,
      src: "/images/fotografi/fotografi1.jpg",
      title: "Golden Hour Cityscape",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 5, 30), // 1 month ago
      resolution: "4096 x 2731 px",
      tools: "Canon EOS R5, Lightroom, Natural Lighting"
    },
    {
      id: 5,
      src: "/images/vector/vector4.jpg",
      title: "Robert Downey Jr Portrait",
      category: "vector",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 5, 15), // 1.5 months ago
      resolution: "3000 x 4000 px",
      tools: "Digital Painting, Photoshop, Color Grading"
    },
    {
      id: 6,
      src: "/images/fotografi/fotografi2.jpg",
      title: "Sample Photography",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 4, 30), // 2 months ago
      resolution: "3840 x 2560 px",
      tools: "DSLR Camera, Adobe Lightroom"
    },
    {
      id: 7,
      src: "/images/fotografi/fotografi3.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 8,
      src: "/images/fotografi/fotografi4.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 9,
      src: "/images/fotografi/fotografi5.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 10,
      src: "/images/fotografi/fotografi6.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 11,
      src: "/images/fotografi/fotografi7.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 12,
      src: "/images/fotografi/fotografi8.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 13,
      src: "/images/fotografi/fotografi9.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 14,
      src: "/images/fotografi/fotografi10.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 15,
      src: "/images/fotografi/fotografi11.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 16,
      src: "/images/fotografi/fotografi12.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
    {
      id: 17,
      src: "/images/vector/vector5.jpg",
      title: "Color Palette Study",
      category: "photography",
      description: "",
      likes: 38,
      uploadDate: new Date(2025, 3, 30), // 3 months ago
      resolution: "2048 x 1536 px",
      tools: "Photoshop, Color Theory, Digital Art"
    },
  ]

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

  return (
    <>
      <Navigation />
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-100">Gallery</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 mx-auto rounded-full mb-6" />
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Koleksi karya vector art dan fotografi pemandangan yang telah saya buat
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
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
              Vector Art ({galleryItems.filter((item) => item.category === "vector").length})
            </Button>
            <Button
              variant={filter === "photography" ? "default" : "outline"}
              onClick={() => setFilter("photography")}
              className={`flex items-center gap-2 ${filter === "photography" ? "bg-amber-600 hover:bg-amber-700" : "border-stone-600 text-stone-400 hover:border-amber-600 hover:text-amber-600"}`}
            >
              <Camera className="w-4 h-4" />
              Photography ({galleryItems.filter((item) => item.category === "photography").length})
            </Button>
          </div>

          {/* Gallery Grid - Masonry Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden rounded-xl border border-stone-700 hover:border-amber-600 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/10 group-hover:scale-[1.02]">
                  {/* Loading skeleton */}
                  {imageLoading.includes(item.id) && (
                    <div className="absolute inset-0 bg-stone-800 animate-pulse rounded-xl"></div>
                  )}
                  
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onLoadStart={() => handleImageLoadStart(item.id)}
                    onLoad={() => handleImageLoad(item.id)}
                    loading="lazy"
                  />
                  
                  {/* Subtle watermark */}
                  <div className="absolute bottom-2 right-2 text-xs text-white/30 font-mono">
                    naaufal
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                    <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-orange-200 mb-2 capitalize">{item.category}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg">No items found for this category.</p>
            </div>
          )}
        </div>

        {/* Footer/Copyright - Moved to bottom */}
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
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Image watermark on modal */}
                <div className="absolute bottom-4 right-4 text-white/20 text-sm font-mono">
                  © naaufal
                </div>
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
                        <span className="px-2 py-1 bg-amber-600/20 text-amber-400 rounded text-xs font-medium capitalize">
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
                <img
                  src={selectedImage?.src || "/placeholder.svg"}
                  alt={selectedImage?.title}
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