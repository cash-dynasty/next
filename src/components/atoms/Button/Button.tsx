import { cn } from '@/utils/styles'
import { HTMLAttributes } from 'react'

type ButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  // className?: HTMLAttributes<HTMLButtonElement>
} & HTMLAttributes<HTMLButtonElement>

export const Button = ({ label, onClick, disabled, type, fullWidth, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        'border-2 bg-primary-50 text-white px-[30px] py-[14px] font-goldman border-primary-100 hover:bg-primary-75 hover:text-white',
        rest.className,
        { [`w-full`]: fullWidth, ['bg-gray-400']: disabled },
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  )
}
