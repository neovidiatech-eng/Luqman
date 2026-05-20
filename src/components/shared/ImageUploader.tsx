// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'
// import { X, UploadCloud } from 'lucide-react'

// export default function ImageUploader() {
//   const [images, setImages] = useState<string[]>([])

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file))
//       setImages(prev => [...prev, ...newImages])
//     }
//   }

//   const removeImage = (index: number) => {
//     setImages(prev => prev.filter((_, i) => i !== index))
//   }

//   return (
//     <div className="space-y-4">
//       <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleFileChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         />
//         <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-3" />
//         <p className="text-sm text-gray-600 font-medium">اسحب وأفلت الصور هنا أو انقر للرفع</p>
//         <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP حتى 5MB</p>
//       </div>

//       {images.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {images.map((url, i) => (
//             <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm">
//               <Image src={url} alt={`Preview ${i}`} fill className="object-cover" sizes="20vw" />
//               <button
//                 type="button"
//                 onClick={() => removeImage(i)}
//                 className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-50 z-10 transition-colors"
//               >
//                 <X size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
"use client";
import { useState } from "react";
import Image from "next/image";
import { X, UploadCloud } from "lucide-react";

interface ImageUploaderProps {
  onFilesChange?: (files: File[]) => void;
}

export default function ImageUploader({ onFilesChange }: ImageUploaderProps) {
  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));

      setPreviews((prev) => {
        const updated = [...prev, ...newPreviews];
        onFilesChange?.(updated.map((p) => p.file));
        return updated;
      });
    }
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesChange?.(updated.map((p) => p.file));
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="text-sm text-gray-600 font-medium">
          اسحب وأفلت الصور هنا أو انقر للرفع
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP حتى 5MB</p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previews.map(({ url }, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
              <Image
                src={url}
                alt={`Preview ${i}`}
                fill
                className="object-cover"
                sizes="20vw"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-50 z-10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
