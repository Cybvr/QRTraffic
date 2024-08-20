// File: components/common/ProgressSteps.tsx

import { FC } from 'react'

interface Props {
  steps: string[]
  currentStep: number
}

const ProgressSteps: FC<Props> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {index + 1}
          </div>
          <div className={`ml-2 text-sm ${index <= currentStep ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-2 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default ProgressSteps