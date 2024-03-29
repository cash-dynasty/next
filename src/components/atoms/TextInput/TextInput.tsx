import { cn } from '@/utils/styles'
import { forwardRef, HTMLInputTypeAttribute, HTMLProps, useEffect, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { MdLockOutline, MdMailOutline, MdPersonOutline } from 'react-icons/md'

type TextInputProps = {
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value?: string | undefined
  fullWidth?: boolean
  leftIcon?: 'e-mail' | 'person' | 'password'
  rightIcon?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: HTMLProps<HTMLElement>['className']
  label?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      placeholder,
      type = 'text',
      value,
      fullWidth,
      leftIcon,
      rightIcon,
      label,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type)

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text')
      } else if (type === 'password' && !showPassword) {
        setInputType('password')
      }
    }, [showPassword, type])

    return (
      <label className={cn('relative block tracking-wide', { ['w-full']: fullWidth })}>
        {label ? (
          <span className="text-white font-normal">{label}</span>
        ) : (
          <span className="sr-only">TextInput</span>
        )}
        {leftIcon && (
          <span
            className={`absolute inset-y-0 left-1 ${
              label ? 'top-6' : 'top-0'
            } flex items-center pl-2`}
          >
            {leftIcon === 'e-mail' ? (
              <MdMailOutline className="text-secondary-100 w-6 h-6" />
            ) : leftIcon === 'person' ? (
              <MdPersonOutline className="text-white opacity-50 w-6 h-6" />
            ) : (
              leftIcon === 'password' && <MdLockOutline className="text-secondary-100 w-6 h-6" />
            )}
          </span>
        )}
        <input
          value={value}
          placeholder={placeholder}
          type={inputType}
          className={cn(
            'text-white placeholder:text-borderGray bg-transparent border-1 border-borderGray focus:outline-none py-2 px-4  tracking-wide',
            {
              ['w-full']: fullWidth,
              ['pl-[44px]']: leftIcon,
              className,
            },
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={cn('flex items-center cursor-pointer absolute inset-y-0 right-3', {
              ['top-6']: label,
              ['top-0']: !label,
            })}
          >
            {showPassword ? (
              <FiEye className="text-secondary-100 w-5 h-5" />
            ) : (
              <FiEyeOff className="text-secondary-100 w-5 h-5" />
            )}
          </span>
        )}
      </label>
    )
  },
)
TextInput.displayName = 'Search'
