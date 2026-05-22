'use client'
import { motion } from 'motion/react'
import Counter from '../Counter'

export default function StatsSection() {
  const stats = [
    { label: 'ريال بداية الأسعار', value: 270 , suffix: 'K'},
    { label: 'ريال مبيعات موثقة', value: 100, suffix: 'M' },
    { label: 'عاماً من الخبرة', value: 13, suffix: '+' },
  ]

  return (
  <motion.section
  className="bg-[#0d3f2d] overflow-hidden"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <div className="container py-26 px-1" dir="ltr">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-30 text-center">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center space-y-2 gap-1"
        >
          <div className="text-5xl md:text-6xl font-black text-[#c9a84c]">
            <Counter to={stat.value} />
            {stat.suffix}
          </div>
          <div className="text-sm md:text-md font-light text-white/50">
          {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</motion.section>
  )
}
