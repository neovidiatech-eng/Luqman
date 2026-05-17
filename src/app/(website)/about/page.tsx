'use client'
import SectionTitle from '@/components/shared/SectionTitle'
import Image from 'next/image'
import { Target, Users, ShieldCheck, Sparkles, Linkedin, Twitter } from 'lucide-react'

export default function About() {
  const team = [
    { name: 'محمد الشمري', role: 'المدير التنفيذي', image: 'https://i.pravatar.cc/150?u=1' },
    { name: 'سارة العتيبي', role: 'مديرة التسويق', image: 'https://i.pravatar.cc/150?u=2' },
    { name: 'خالد الدوسري', role: 'مدير المبيعات', image: 'https://i.pravatar.cc/150?u=3' },
  ]

  const values = [
    { icon: ShieldCheck, title: 'الشفافية', desc: 'نعمل بوضوح تام مع عملائنا في كل خطوة.' },
    { icon: Sparkles, title: 'الاحترافية', desc: 'فريقنا مؤهل بأعلى المعايير العالمية في العقار.' },
    { icon: Users, title: 'الثقة', desc: 'بنينا علاقات مستدامة تقوم على الصدق والنزاهة.' },
    { icon: Target, title: 'الابتكار', desc: 'نستخدم أحدث الحلول التقنية لتسهيل تجربتكم.' },
  ]

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary pt-32 pb-48 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" alt="About Hero" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">نحن لقمان للتسويق العقاري</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">رواد الوساطة والتطوير العقاري في المملكة العربية السعودية منذ أكثر من 10 سنوات.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 mb-[-80px] relative z-10">
        <div className="container">
          <div className="bg-white p-8 md:p-20 rounded-[4rem] shadow-2xl border border-border flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <Image 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=1200" 
                  alt="Our Story" 
                  width={600}
                  height={800}
                  className="rounded-[3rem] shadow-2xl object-cover w-full h-auto"
                />
                <div className="absolute -bottom-8 -right-8 bg-secondary p-8 rounded-3xl shadow-xl hidden md:block">
                  <p className="text-primary text-4xl font-black mb-1">+10</p>
                  <p className="text-primary/70 font-bold text-xs uppercase tracking-widest">سنوات من الخبرة</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <SectionTitle title="قصة النجاح والرسالة" />
              <div className="space-y-6 text-text-muted leading-loose text-lg">
                <p>
                  بدأت لقمان للتسويق العقاري كفكرة طموحة لسد الفجوة بين تطلعات الملاك واحتياجات المشترين في سوق عقاري متسارع النمو. اليوم، نفخر بكوننا أحد أكثر الأسماء موثوقية في القطاع.
                </p>
                <p>
                  رسالتنا هي تمكين الجميع من الوصول إلى فرص عقارية استثنائية وتحقيق عوائد مجزية من خلال تقديم حلول تسويقية مبتكرة وخدمات استشارية مبنية على حقائق وبيانات السوق اللحظية.
                </p>
                <p>
                  نحن نؤمن بأن العقار ليس مجرد جدران، بل هو استثمار في المستقبل وبناء للمجتمعات، ولذا نضع قيمنا الأخلاقية فوق كل اعتبار في كافة تعاملاتنا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-bg pt-40">
        <div className="container">
          <SectionTitle center title="قيمنا التي نعتز بها" subtitle="المبادئ التي توجه كل قرار نتخذه وكل علاقة نبنيها" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-border flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 bg-bg rounded-3xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors">
                  <v.icon className="w-10 h-10 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <h4 className="text-2xl font-black text-primary mb-4">{v.title}</h4>
                <p className="text-text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <SectionTitle center title="فريق العمل" subtitle="نخبة من الخبراء والمتخصصين لتقديم أفضل خدمة لعملائنا" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-bg mb-8 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image src={member.image} alt={member.name} width={192} height={192} className="object-cover w-full h-full" />
                </div>
                <h4 className="text-2xl font-black text-primary mb-2">{member.name}</h4>
                <p className="text-secondary font-bold mb-6">{member.role}</p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
