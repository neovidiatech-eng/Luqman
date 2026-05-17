import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-[var(--border)] flex items-center gap-4">
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-2xl"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[0.8rem] text-[var(--text-muted)] mb-0.5">{title}</p>
        <h3 className="text-2xl font-bold text-[var(--primary)] leading-tight">{value}</h3>
      </div>
    </div>
  )
}
