'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, Calendar, Building2, TrendingUp, 
  Download, CheckCircle2, ChevronDown
} from 'lucide-react'
import { useGetProject } from "@/hooks/public/useProjects";
import PropertyGallery from '@/components/properties/PropertyGallery'
import ContactForm from '@/components/shared/ContactForm'
import MapPlaceholder from '@/components/shared/MapPlaceholder'
import UnitTable from '@/components/projects/UnitTable'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { formatPrice } from '@/lib/utils'

export default function ProjectDetail() {
  const params = useParams()
  const id = params?.id as string
  
  const { data: projectResponse, isLoading, error } = useGetProject(id);
  const project = projectResponse?.data;

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 text-center container">
        <h1 className="text-2xl font-bold text-primary animate-pulse">جاري تحميل تفاصيل المشروع...</h1>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-40 pb-20 text-center container">
        <h1 className="text-4xl font-black mb-4">المشروع غير موجود</h1>
        <Link href="/projects" className="btn btn-primary">العودة لقائمة المشاريع</Link>
      </div>
    )
  }

  return (
    <main className="pt-32 pb-20 bg-bg">
      <div className="container">
        <Breadcrumb 
          items={[
            { label: 'المشاريع', href: '/projects' },
            { label: project.name }
          ]} 
        />

        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-border shadow-xl mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 pb-8 border-b border-gray-100">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-secondary text-primary px-4 py-1 rounded-full text-xs font-black">مشروع حصري</span>
                <span className="bg-primary/5 text-primary px-4 py-1 rounded-full text-xs font-black capitalize">{project.status.replace('_', ' ')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary mb-4 leading-tight">{project.name}</h1>
              <div className="flex items-center gap-3 text-text-muted text-lg">
                <MapPin className="w-6 h-6 text-secondary" />
                <span className="font-bold">{project.city}</span>
              </div>
            </div>
            
            <div className="bg-bg p-8 rounded-3xl min-w-[280px] text-center border border-border">
              <p className="text-text-muted font-bold mb-1">الأسعار تبدأ من</p>
              <p className="text-secondary text-4xl font-black mb-4">{formatPrice(project.startingPrice)}</p>
              <button className="btn btn-primary w-full py-4 uppercase tracking-widest text-xs">احجز وحدتك الآن</button>
            </div>
          </div>

          <PropertyGallery images={project.images} videoUrl={project.videoUrl || undefined} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-bg rounded-[2rem]">
                {[
                  { label: 'الوحدات الكلية', value: project.totalUnits, icon: Building2 },
                  { label: 'الوحدات المتاحة', value: project.availableUnits, icon: CheckCircle2 },
                  { label: 'تاريخ التسليم', value: project.deliveryDate ? project.deliveryDate.substring(0, 10).split('-').reverse().join('/') : "غير محدد", icon: Calendar },
                  { label: 'المطور', value: project.developerName, icon: TrendingUp },
                ].map((stat, i) => (
                  <div key={i} className="text-center md:text-right">
                    <div className="flex items-center gap-2 text-secondary mb-2">
                      <stat.icon className="w-5 h-5" />
                      <span className="text-[10px] uppercase font-black tracking-widest">{stat.label}</span>
                    </div>
                    <p className="text-xl font-black text-primary">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div>
                <h3 className="text-3xl font-black text-primary mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-secondary rounded-full"></span>
                  نسبة الإنجاز
                </h3>
                <div className="p-8 bg-white border border-border rounded-3xl">
                  <div className="flex items-center justify-between font-black text-2xl mb-4">
                    <span className="text-primary">معدل الإتمام الحالي</span>
                    <span className="text-secondary">{project.completionPercentage}%</span>
                  </div>
                  <div className="h-4 bg-bg rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full bg-secondary rounded-full transition-all duration-[2000ms]"
                      style={{ width: `${project.completionPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-text-muted">نحن نلتزم بأعلى معايير الجودة والجداول الزمنية لضمان تسليم مشروعك في الوقت المحدد وبأفضل المواصفات.</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-3xl font-black text-primary mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-secondary rounded-full"></span>
                  عن المشروع
                </h3>
                <div className="text-text-muted leading-relaxed text-lg whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>

              {/* Units Table */}
              <div>
                <h3 className="text-3xl font-black text-primary mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-secondary rounded-full"></span>
                  الوحدات المتاحة
                </h3>
                <UnitTable units={project.units} />
              </div>

              {/* Payment Plans */}
              <div>
                <h3 className="text-3xl font-black text-primary mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-secondary rounded-full"></span>
                  خطط الدفع
                </h3>
                <div className="bg-white border border-border rounded-3xl p-8">
                  <p className="text-lg text-primary font-bold leading-relaxed">{project.paymentPlans}</p>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-3xl font-black text-primary mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-secondary rounded-full"></span>
                  الموقع والخدمات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-bg rounded-xl">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="font-bold text-primary">{feature}</span>
                    </div>
                  ))}
                </div>
                <MapPlaceholder location={`${project.city}`} />
              </div>
            </div>

            {/* Sticky Sidebar Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-2xl">
                  <h4 className="text-2xl font-black text-primary mb-2">مهتم بهذا المشروع؟</h4>
                  <p className="text-text-muted mb-8 text-sm">اترك بياناتك وسيقوم خبير المشاريع لدينا بالتواصل معك فوراً.</p>
                  <ContactForm compact propertyTitle={project.name} />
                </div>

                <div className="bg-bg p-8 rounded-[2rem] border border-border">
                  <h4 className="text-xl font-bold mb-6">ملفات التحميل</h4>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-border hover:border-secondary transition-all group">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-secondary" />
                        <span className="font-bold text-sm">بروشور المشروع</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-secondary" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-border hover:border-secondary transition-all group">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-secondary" />
                        <span className="font-bold text-sm">المخطط الرئيسي</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-secondary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
