'use client'
import { cn } from '@/utils/styles'
import { HTMLInputTypeAttribute, ChangeEvent } from 'react'
import { MdPerson } from 'react-icons/md'

type TextInputProps = {
  placeholder: string
  type: HTMLInputTypeAttribute
  value: string | undefined
  fullWidth?: boolean
  leftIcon?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = ({
  placeholder,
  type,
  value,
  fullWidth,
  leftIcon,
  onChange,
}: TextInputProps) => {
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
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className={cn(
          'text-tertiary-100 bg-tertiary-25 border-1 border-tertiary-100 focus:outline-none p-4 focus:bg-primary-25 focus:border-primary-100',
          { 'w-full': fullWidth, 'pl-[30px]': leftIcon },
        )}
      />
    </label>
  )
}
