import React from 'react'

interface StepperFormProps {
  steps: string[]
  currentStep: number
}

export default function StepperForm({ steps, currentStep }: StepperFormProps) {
  return (
    <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        
        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-3 min-w-[100px]">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted ? 'bg-[var(--secondary)] text-white' :
                  isCurrent ? 'bg-white border-2 border-[var(--secondary)] text-[var(--secondary)]' :
                  'bg-white border-2 border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className={`text-xs font-bold whitespace-nowrap ${
                isCurrent ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
              }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] min-w-[30px] mx-4 bg-[var(--border)] relative -top-3">
                <div 
                  className="absolute top-0 right-0 h-full bg-[var(--secondary)] transition-all duration-500"
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
