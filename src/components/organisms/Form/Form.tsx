import React from 'react'

interface Props {
  children: React.ReactNode
}

const Form = ({ children }: Props) => {
  return <div className="flex flex-col gap-4 bg-slate-800 p-12 w-full max-w-xl">{children}</div>
}

export default Form
