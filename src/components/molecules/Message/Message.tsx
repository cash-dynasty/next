import { cn } from '@/utils/styles'

export const Message = ({ isMine, message, createdAt, author }) => {
  return (
    <div
      className={cn('p-2 bg-slate-400 mt-2 rounded-md', {
        ['bg-slate-200 text-right']: isMine,
      })}
    >
      <p className="text-xs">{createdAt}</p>
      <p className="text-l font-bold">{author}</p>
      <p className="break-words">{message}</p>
    </div>
  )
}
