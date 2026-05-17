'use client'
import { useState, useEffect, useRef } from 'react'
import { Building2, Users, Handshake, MapPin } from 'lucide-react'

export default function StatsSection() {
  const [counts, setCounts] = useState([0, 0, 0, 0])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { label: 'عقار متاح', value: 500, icon: Building2 },
    { label: 'مطور موثوق', value: 50, icon: Users },
    { label: 'صفقة ناجحة', value: 200, icon: Handshake },
    { label: 'مدينة مغطاة', value: 15, icon: MapPin },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const durations = [2000, 2000, 2000, 2000]
    const frames = 60
    
    const intervals = stats.map((stat, i) => {
      const increment = stat.value / (durations[i] / (1000 / frames))
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setCounts(prev => {
          const next = [...prev]
          next[i] = Math.floor(current)
          return next
        })
      }, 1000 / frames)
      
      return timer
    })

    return () => intervals.forEach(clearInterval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 bg-bg">
      <div className="container">
        <div className="bg-primary rounded-3xl py-12 px-8 shadow-2xl relative overflow-hidden flex flex-wrap justify-around items-center gap-8">
          {/* Decorative background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
          
          {stats.map((stat, i) => (
            <div key={i} className="text-center relative z-10 min-w-[150px]">
              <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                +{counts[i]}
              </p>
              <p className="text-accent font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
