import { cn } from '@/utils/styles'
import { HTMLAttributes } from 'react'

type ButtonProps = {
  children?: React.ReactNode
  label?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  // className?: HTMLAttributes<HTMLButtonElement>
} & HTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  label,
  onClick,
  disabled,
  type,
  fullWidth,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 text-white font-medium border-1 bg-buttonBg border-borderGray hover:bg-borderGray  flex items-center justify-center',
        rest.className,
        { [`w-full`]: fullWidth, ['bg-gray-400 opacity-50 hover:bg-transparent']: disabled },
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children || label}
    </button>
  )
}
