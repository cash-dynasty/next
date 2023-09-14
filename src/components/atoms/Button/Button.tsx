type ButtonProps = {
  label: string
}

export const Button = ({ label }: ButtonProps) => {
  return (
    <button className="border-2 bg-primary-50 text-tertiary-75 px-[30px] py-[14px] font-goldman border-1 border-primary-100">
      {label}
    </button>
  )
}
