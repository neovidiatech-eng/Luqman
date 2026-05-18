'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronRight, ChevronLeft, Play } from 'lucide-react'
import Image from 'next/image'

interface PropertyGalleryProps {
  images: string[]
  videoUrl?: string
}

export default function PropertyGallery({ images = [], videoUrl }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  const defaultImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
  const galleryImages = Array.isArray(images) && images.length > 0 ? images.filter(img => img && img !== "") : []
  const safeImages = galleryImages.length > 0 ? galleryImages : [defaultImage]

  // Combine video and images into a single items array, placing all images first, followed by the video at the end
  const items: { type: 'image' | 'video'; url: string }[] = []
  
  // 1. Add all images first
  safeImages.forEach((img) => {
    items.push({ type: 'image', url: img })
  })
  
  // 2. Add video at the end if present
  if (videoUrl && videoUrl !== "") {
    items.push({ type: 'video', url: videoUrl })
  }

  const currentItem = items[activeIndex] || { type: 'image', url: defaultImage }

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 240 // Scroll by 2 thumbnails at a time (120px + 120px)
      // Since it's in Arabic (RTL), left and right scroll directions are reversed for scrollLeft
      const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl' || true // default to true since our site is Arabic
      
      let amount = direction === 'left' ? -scrollAmount : scrollAmount
      if (isRTL) {
        // In RTL, positive is left and negative is right
        amount = direction === 'left' ? scrollAmount : -scrollAmount
      }

      thumbnailContainerRef.current.scrollBy({
        left: amount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Main Slide (Image or Video) */}
      <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {currentItem.type === 'video' ? (
              <div className="w-full h-full">
                {currentItem.url.includes('youtube') || currentItem.url.includes('youtu.be') ? (
                  <iframe
                    className="w-full h-full aspect-video"
                    src={
                      currentItem.url.includes('youtu.be') 
                        ? currentItem.url.replace('youtu.be/', 'www.youtube.com/embed/') 
                        : currentItem.url.replace('watch?v=', 'embed/')
                    }
                    title="Property Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    className="w-full h-full object-contain outline-none"
                    controls
                    src={currentItem.url}
                  >
                    متصفحك لا يدعم تشغيل الفيديو.
                  </video>
                )}
              </div>
            ) : (
              <Image
                src={currentItem.url}
                alt={`Gallery Image ${activeIndex}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button 
              onClick={() => setActiveIndex(prev => (prev === 0 ? items.length - 1 : prev - 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <button 
              onClick={() => setActiveIndex(prev => (prev === items.length - 1 ? 0 : prev + 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails with Scroll Arrows */}
      {items.length > 1 && (
        <div className="relative group/thumbs flex items-center px-8">
          {/* Scroll Right Button (goes next in RTL) */}
          <button 
            onClick={() => scrollThumbnails('right')}
            className="absolute right-0 w-8 h-[80px] bg-white/80 backdrop-blur-sm hover:bg-secondary hover:text-primary transition-all flex items-center justify-center text-primary rounded-xl border border-border shadow-sm z-10 opacity-0 group-hover/thumbs:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Thumbnails Container */}
          <div 
            ref={thumbnailContainerRef}
            className="flex-1 flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`min-w-[120px] h-[80px] rounded-xl overflow-hidden border-2 transition-all relative ${
                  activeIndex === i ? 'border-secondary scale-95 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                    {/* Backdrop for video thumbnail */}
                    {safeImages[0] && (
                      <Image src={safeImages[0]} alt="Video Thumbnail Backdrop" fill className="object-cover opacity-40 blur-[1px]" sizes="120px" />
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-primary" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image src={item.url} alt={`Thumbnail ${i}`} fill className="object-cover" sizes="120px" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Scroll Left Button (goes prev in RTL) */}
          <button 
            onClick={() => scrollThumbnails('left')}
            className="absolute left-0 w-8 h-[80px] bg-white/80 backdrop-blur-sm hover:bg-secondary hover:text-primary transition-all flex items-center justify-center text-primary rounded-xl border border-border shadow-sm z-10 opacity-0 group-hover/thumbs:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
