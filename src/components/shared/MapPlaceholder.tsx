import { MapPin } from 'lucide-react'

interface MapPlaceholderProps {
  location: string
  height?: string
}

export default function MapPlaceholder({ location, height = '300px' }: MapPlaceholderProps) {
  return (
    <div 
      className="bg-gray-200 rounded-2xl border-2 border-border flex flex-col items-center justify-center text-text-muted gap-4 overflow-hidden relative"
      style={{ height }}
    >
      {/* Decorative elements representing a map */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-current"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-current"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-current"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-current"></div>
        <div className="absolute left-1/2 top-0 w-px h-full bg-current"></div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-current"></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="bg-white p-4 rounded-full shadow-lg mb-2">
          <MapPin className="w-8 h-8 text-secondary" />
        </div>
        <p className="font-bold text-lg text-primary">{location}</p>
        <p className="text-sm">الموقع الجغرافي التقريبي</p>
      </div>
    </div>
  )
}
