'use client'
import { LoginForm } from '@organisms'

export default function Home() {
  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-4 w-full max-w-xl m-auto">Homepage content</div>
      <div className="fixed flex flex-col gap-4 w-full max-w-xl justify-self-end">
        <LoginForm />
      </div>
    </div>
  )
}
