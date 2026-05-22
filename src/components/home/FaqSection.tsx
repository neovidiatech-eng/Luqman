'use client'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'كيف أحصل على العقار مع لقمان؟',
      answer: 'نبدأ بفهم احتياجك ثم نوضح لك الخيارات وأنظمة الدفع المناسبة ونتابع معك خطوة بخطوة.',
    },
    {
      question: 'كيف يعمل نظام التقسيط؟',
      answer: 'نقدم حلول تمويلية مرنة بالتعاون مع البنوك المعتمدة لتسهيل تملكك للعقار المناسب.',
    },
    {
      question: 'هل لقمان وسيط موثوق ومرخص؟',
      answer: 'نعم، نحن وسيط عقاري مرخص من الهيئة العامة للعقار ولدينا خبرة تتجاوز 15 عاماً في السوق السعودي.',
    },
    {
      question: 'كم يستغرق الوقت من التواصل إلى الاستلام؟',
      answer: 'يعتمد ذلك على جاهزية العقار ونوع التمويل، ولكننا نحرص على إتمام الإجراءات في أسرع وقت ممكن.',
    },
  ]

  return (
    <section className="py-24 bg-[#f7f4ea]">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <div className="text-[#c9a84c] font-bold text-lg mb-2">الأسئلة الشائعة</div>
          <h2 className="text-3xl md:text-4xl font-black text-[#133c2e] mb-6">
            أسئلة يسألها كثيرون — إجاباتنا دائماً واضحة
          </h2>
          <div className="w-24 h-1 bg-[#c9a84c] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#c9a84c] bg-[#f9f8f4]' : 'border-gray-200 bg-white hover:border-[#c9a84c]/50'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-bold text-base text-[#133c2e]">{faq.question}</span>
                  <div className={`flex-shrink-0 ml-4 ${isOpen ? 'text-[#c9a84c]' : 'text-[#133c2e]'}`}>
                    {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-gray-500 text-sm leading-relaxed text-right">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
