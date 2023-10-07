import React from 'react'

type FormProps = {
  children: React.ReactNode
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

const Form = ({ children, ...props }: FormProps) => {
  return (
    <div className="flex flex-col gap-4 bg-slate-800 p-12 w-full max-w-xl">
      <form {...props}>{children}</form>
    </div>
  )
}

export default Form
