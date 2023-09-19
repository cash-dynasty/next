type ButtonProps = {
  label: string
  onClick?: () => void
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="border-2 bg-primary-50 text-tertiary-75 px-[30px] py-[14px] font-goldman border-primary-100 hover:bg-primary-75 hover:text-tertiary-100"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
