'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import ProjectCard from '@/components/projects/ProjectCard'
import { mockProjects } from '@/lib/mock-data'

export default function FeaturedProjects() {
  const projects = mockProjects.slice(0, 3)

  return (
    <section className="py-24 bg-bg">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle 
            title="أبرز المشاريع الاستثمارية" 
            subtitle="فرص عقارية استثنائية في أرقى الأحياء والمناطق الحيوية"
          />
          <Link 
            href="/projects" 
            className="hidden md:flex items-center gap-2 text-primary font-black hover:text-secondary transition-colors group mb-12"
          >
            <span>عرض جميع المشاريع</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/projects" 
            className="btn btn-primary w-full"
          >
            عرض جميع المشاريع
          </Link>
        </div>
      </div>
    </section>
  )
}
