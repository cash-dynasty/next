import { RegisterForm } from '@organisms'

export default function Register() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full max-w-xl">
        <RegisterForm />
      </div>
    </div>
  )
}
