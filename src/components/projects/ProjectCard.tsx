'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Building2, TrendingUp, ArrowLeft } from 'lucide-react'
import { Project } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

interface ProjectCardProps {
  key?: string | number;
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusLabels = {
    under_construction: { label: 'قيد الإنشاء', color: 'bg-warning' },
    completed: { label: 'مكتمل', color: 'bg-success' },
    development: { label: 'قيد التطوير', color: 'bg-primary' },
  }

  const status = statusLabels[project.status]

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 group flex flex-col">
      <div className="relative h-[250px] overflow-hidden">
        <Image 
          src={project.images[0]} 
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className={`${status.color} text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg`}>
            {status.label}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-text-muted text-xs font-bold mb-4">
          <MapPin className="w-4 h-4 text-secondary" />
          <span>{project.city}</span>
        </div>

        <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
          {project.name}
        </h3>

        <p className="text-text-muted text-sm line-clamp-2 mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-bold mb-2">
            <span className="text-primary">نسبة الإنجاز</span>
            <span className="text-secondary">{project.completionPercentage}%</span>
          </div>
          <div className="h-2 bg-bg rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary rounded-full transition-all duration-1000"
              style={{ width: `${project.completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 text-xs font-bold text-text-muted">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-secondary" />
            <span>{project.availableUnits} وحدة متاحة</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            <span>تسليم {project.deliveryDate.split('-')[0]}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-text-muted font-black mb-1">يبدأ من</p>
            <p className="text-primary text-xl font-black">{formatPrice(project.startingPrice)}</p>
          </div>
          <Link 
            href={`/projects/${project.id}`}
            className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary transition-all group/btn"
          >
            <ArrowLeft className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
