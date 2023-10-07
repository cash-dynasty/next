import React from 'react'

type FormProps = {
  children: React.ReactNode
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

const Form = ({ children, ...props }: FormProps) => {
  // chce zeby form mial "max-w-xl" klase proszeeeeeeee - Domi <333333
  return (
    <form {...props}>
      <div className="flex flex-col gap-4 bg-slate-800 p-12 w-full">{children}</div>
    </form>
  )
}

export default Form
