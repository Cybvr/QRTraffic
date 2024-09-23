import { FC } from 'react'
import { Check } from 'lucide-react'

interface Props {
  steps: string[]
  currentStep: number
  onStepClick: (stepIndex: number) => void
}

const ProgressSteps: FC<Props> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full px-0 py-2">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div 
            key={step} 
            className="flex items-center flex-1 cursor-pointer"
            onClick={() => onStepClick(index)}
          >
            {/* Step indicator */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${index < currentStep 
                ? 'bg-indigo-600 text-white' 
                : index === currentStep
                ? 'border-2 border-indigo-600 text-indigo-600'
                : 'border-2 border-gray-300 text-gray-300'
              }
            `}>
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{String(index + 1).padStart(2, '0')}</span>
              )}
            </div>
            {/* Step label */}
            <span className={`ml-2 text-sm font-medium
              ${index < currentStep 
                ? 'text-gray-900' 
                : index === currentStep
                ? 'text-indigo-600'
                : 'text-gray-500'
              }
            `}>
              {step}
            </span>
            {/* Arrow separator */}
            {index < steps.length - 1 && (
              <div className="flex-grow flex items-center justify-center mx-2">
                <div className={`h-0.5 w-full ${index < currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                <div className={`w-2 h-2 transform rotate-45 -ml-1 ${index < currentStep ? 'border-t-2 border-r-2 border-indigo-600' : 'border-t-2 border-r-2 border-gray-300'}`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressSteps