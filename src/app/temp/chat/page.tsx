import { Message } from '@molecules/Message'

export default function Chat() {
  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <h1>Chat</h1>

        <Message />
      </div>
    </div>
  )
}
