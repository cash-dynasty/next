import { cn } from '@/utils/styles'
import { HTMLAttributes } from 'react'

type ButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  // className?: HTMLAttributes<HTMLButtonElement>
} & HTMLAttributes<HTMLButtonElement>

export const Button = ({ label, onClick, disabled, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        'border-2 bg-primary-50 text-tertiary-75 px-[30px] py-[14px] font-goldman border-primary-100 hover:bg-primary-75 hover:text-tertiary-100',
        rest.className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
