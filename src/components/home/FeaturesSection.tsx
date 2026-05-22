import { Trophy, CreditCard, MapPin, Search } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      title: 'خبرة عقارية موثوقة',
      description: 'نقدّم لك خيارات موثوقة تناسب احتياجك وميزانيتك.',
      icon: Trophy,
    },
    {
      title: 'حلول دفع مريحة',
      description: 'نقدّم لك خيارات موثوقة تناسب احتياجك وميزانيتك.',
      icon: CreditCard,
    },
    {
      title: 'مواقع مختارة بعناية',
      description: 'نقدّم لك خيارات موثوقة تناسب احتياجك وميزانيتك.',
      icon: MapPin,
    },
    {
      title: 'خيارات تناسب احتياجك',
      description: 'نقدّم لك خيارات موثوقة تناسب احتياجك وميزانيتك.',
      icon: Search,
    },
  ]

  return (
    <section className="py-24 bg-[#f7f4ea]">
      <div className="container">
        <div className="text-center mb-16">
          <div className="text-[#c9a84c] font-bold text-lg mb-2">ما يميز لقمان</div>
          <h2 className="text-3xl md:text-4xl font-black text-[#133c2e] mb-6">
            لماذا يختار العملاء لقمان؟
          </h2>
          <div className="w-24 h-1 bg-[#c9a84c] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" dir='ltr'>
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-[#133c2e]" />
              </div>
              <h3 className="text-lg font-bold text-[#133c2e] mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
