interface StatsCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  iconBg: string
  trend?: string
}

export default function StatsCard({ title, value, icon, iconBg, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between border border-gray-100">
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
        <h4 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{value}</h4>
        {trend && (
          <p className="text-xs mt-2 text-green-600 font-medium">
            {trend} مقارنة بالشهر السابق
          </p>
        )}
      </div>
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
    </div>
  )
}
