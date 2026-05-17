'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`Gallery Image ${activeIndex}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
        <button 
          onClick={() => setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`min-w-[120px] h-[80px] rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === i ? 'border-secondary scale-95 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <div className="relative w-full h-full">
              <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" sizes="120px" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
