type ButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
}

export const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="border-2 bg-primary-50 text-tertiary-75 px-[30px] py-[14px] font-goldman border-primary-100 hover:bg-primary-75 hover:text-tertiary-100"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
