import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-[100vh] flex items-center pl-30 pt-25 overflow-visible bg-[#0e3829]">
      <div className="container relative z-10 flex">
        <div className="max-w-3xl space-y-4 text-right">
          <div className="text-[#c9a84c] font-bold text-lg md:text-lg mb-5">
            وسيط عقاري مرخص 15+ سنة خبرة
          </div>
          
          <h1 className="text-5xl md:text-[4rem] font-black text-white leading-tight mb-4 drop-shadow-2xl">
            نوفّر عليك الحيرة
          </h1>
          
          <p className="text-lg md:text-lg text-white/90 mb-10 font-medium leading-relaxed">
            امتلك عقارك بسهولة مع وسيط عقاري ذو خبرة تتجاوز 15 عاماً داخل المملكة
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mt-8">
            <Link 
              href="/properties" 
              className="px-7 py-3.5 bg-[#c9a84c] text-[#133c2e] rounded-xl font-bold text-md w-full sm:w-auto hover:bg-[#b8973b] transition-all text-center"
            >
              تصفح العقارات
            </Link>
            <Link 
              href="/contact" 
              className="px-7 py-3.5 border border-[#c9a84c] text-[#c9a84c] rounded-xl font-bold text-md w-full sm:w-auto hover:bg-[#c9a84c] hover:text-[#133c2e] transition-all text-center"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
