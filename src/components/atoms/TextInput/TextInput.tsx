import { cn } from '@/utils/styles'
import { forwardRef, HTMLInputTypeAttribute } from 'react'
import { MdPerson } from 'react-icons/md'

type TextInputProps = {
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value?: string | undefined
  fullWidth?: boolean
  leftIcon?: boolean
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ placeholder, type = 'text', value, fullWidth, leftIcon, ...props }, ref) => {
    return (
      <label className="relative block">
        <span className="sr-only">TextInput</span>
        {leftIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MdPerson className="text-tertiary-100" />
          </span>
        )}
        <input
          value={value}
          placeholder={placeholder}
          type={type}
          className={cn(
            'text-tertiary-100 bg-tertiary-25 border-1 border-tertiary-100 focus:outline-none p-4 focus:bg-primary-25 focus:border-primary-100',
            {
              'w-full': fullWidth,
              'pl-[30px]': leftIcon,
            },
          )}
          ref={ref}
          {...props}
        />
      </label>
    )
  },
)
TextInput.displayName = 'Search'
