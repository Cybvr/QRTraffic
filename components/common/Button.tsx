import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'font-bold py-2 px-4 rounded'
  const variantStyle = variant === 'primary' 
    ? 'bg-blue-500 hover:bg-blue-700 text-white' 
    : 'bg-gray-300 hover:bg-gray-400 text-black'

  return (
    <button 
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button