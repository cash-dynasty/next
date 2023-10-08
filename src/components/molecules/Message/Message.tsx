import { cn } from '@/utils/styles'
import { Message as MessageType, User } from '@prisma/client'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'

type MessageProps = {
  message: MessageType & { from: { username: User['username'] } }
}

export const Message = ({ message: { createdAt, fromId, message, from } }: MessageProps) => {
  const { data } = useSession()
  const isAuthor = fromId === data?.user.id

  return (
    <div
      className={cn('p-2 bg-slate-400 mt-2 rounded-md', {
        ['bg-slate-200 text-right']: isAuthor,
      })}
    >
      <div className={cn('flex justify-between items-center', { ['flex-row-reverse']: isAuthor })}>
        <p className=" font-bold">{from.username}</p>
        <p className={cn('text-xs text-gray-200', { ['text-black-100']: isAuthor })}>
          {dayjs(createdAt).format('HH:mm')}
        </p>
      </div>
      <p className="break-words">{message}</p>
    </div>
  )
}
