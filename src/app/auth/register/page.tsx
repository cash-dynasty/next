import { RegisterForm } from '@organisms'

export default function Register() {
  return (
    <div className="w-full flex justify-center lg:justify-start items-center">
      <div className="absolute flex justify-center items-center overflow-hidden h-full w-full"></div>
      <div
        className="bg-no-repeat bg-center bg-cover w-full min-h-screen absolute top-0 left-0 z-0"
        style={{ backgroundImage: 'url(/city.png)' }}
      ></div>
      <div className="flex flex-col gap-4 w-full max-w-xl p-2 lg:p-0 lg:ml-20">
        <RegisterForm />
      </div>
    </div>
  )
}
