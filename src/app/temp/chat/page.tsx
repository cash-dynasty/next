import { Message } from '@molecules'

export default function Chat() {
  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <h1>Chat</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm bg-slate-300">
        <div className="m-5">
          <Message />
        </div>
      </div>
    </div>
  )
}
