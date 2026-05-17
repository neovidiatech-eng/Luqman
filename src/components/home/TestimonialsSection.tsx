'use client'
import { Star, Quote } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import { mockTestimonials } from '@/lib/mock-data'

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <SectionTitle 
          center 
          title="ماذا يقول عملاؤنا" 
          subtitle="ثقة عملاء لقمان هي المحرك الأساسي لنجاحنا وتطورنا المستمر"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-bg p-8 rounded-3xl relative border border-border group hover:border-secondary transition-all"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-secondary/20 group-hover:text-secondary/40 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-2xl">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-text-muted text-sm">{testimonial.city}</p>
                </div>
              </div>

              <p className="text-text-muted leading-relaxed mb-6 text-lg italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
