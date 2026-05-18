'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import ProjectCard from '@/components/projects/ProjectCard'
import { useHomeData } from '@/hooks/public/useProperties'

export default function FeaturedProjects() {
  const { data, isLoading, error } = useHomeData()
  const projects = data?.data?.featuredProjects || []

  if (isLoading) {
    return <div className="text-center py-24 font-bold text-primary">جاري التحميل...</div>
  }

  if (error) {
    return <div className="text-center py-24 font-bold text-red-500">حدث خطأ أثناء تحميل المشاريع</div>
  }

  if (!data) {
    return null
  }

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

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <h3 className="text-xl font-bold text-gray-500">لا توجد مشاريع لعرضها في الوقت الحالي</h3>
          </div>
        )}

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
