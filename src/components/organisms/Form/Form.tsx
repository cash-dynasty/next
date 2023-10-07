import React from 'react'

interface FormProps {
  children: React.ReactNode
}

const Form = ({ children, ...props }: FormProps) => {
  return (
    <div className="flex flex-col gap-4 bg-slate-800 p-12 w-full max-w-xl">
      <form {...props}>{children}</form>
    </div>
  )
}

export default Form
