import React from 'react';
import { EnviarButtonProps } from '@/interfaces/SendButtonProps';

export default function EnviarButton({
  children,
  onClick,
  className = '',
}: EnviarButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`
        bg-yellow-500 text-black font-bold 
        px-6 py-3 rounded-lg 
        hover:bg-yellow-600 transition
        ${className}
      `}
    >
      {children}
    </button>
  )
}