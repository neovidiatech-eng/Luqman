import SearchBar from './SearchBar'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] flex items-center pt-20 overflow-visible">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          alt="Real Estate Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1B2A4A]/85 backdrop-blur-[2px]"></div>
      </div>

      <div className="container relative z-10 text-center flex flex-col items-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
            ابحث عن <span className="text-secondary underline decoration-secondary/30 underline-offset-8">عقارك المثالي</span> في المملكة
          </h1>
          <p className="text-lg md:text-2xl text-accent/80 mb-16 max-w-3xl mx-auto font-medium">
            منصة متكاملة تربطك بأفضل العقارات المتاحة والمشاريع الحصرية من كبار المطورين في جميع مدن السعودية.
          </p>
          
          <div className="w-full max-w-5xl translate-y-1/2">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  )
}
