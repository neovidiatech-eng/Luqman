interface SectionTitleProps {
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionTitle({ title, subtitle, center = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'border-r-4 border-secondary pr-6'}`}>
      <h2 className="text-3xl md:text-4xl font-black text-primary mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-text-muted text-lg max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
