"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  onImagesChange?: (images: string[]) => void
}

export default function ImageUploader({ onImagesChange }: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newPreviews = filesArray.map(file => URL.createObjectURL(file))
      const combined = [...previews, ...newPreviews]
      setPreviews(combined)
      onImagesChange?.(combined)
    }
  }

  const removeImage = (index: number) => {
    const filtered = previews.filter((_, i) => i !== index)
    setPreviews(filtered)
    onImagesChange?.(filtered)
  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="border-2 border-dashed border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center transition-all group-hover:border-[var(--secondary)] group-hover:bg-[var(--accent)]/10">
          <div className="w-12 h-12 bg-[var(--bg)] rounded-full flex items-center justify-center mb-3 text-[var(--secondary)]">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-[var(--primary)] mb-1">اضغط أو اسحب الصور هنا للرفع</p>
          <p className="text-xs text-[var(--text-muted)]">يدعم JPG, PNG (حد أقصى 5 ميجا لكل صورة)</p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {previews.map((src, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border)] group">
              <Image src={src} alt="Preview" fill className="object-cover" unoptimized />
              <button 
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
