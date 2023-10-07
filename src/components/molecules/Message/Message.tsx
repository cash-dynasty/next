import { Message as MessageType } from '@prisma/client'

type MessageProps = {
  message: MessageType
}

export const Message = (message: MessageProps) => {
  // const isAuthor =

  // console.log(message.message)

  return (
    <p>{message.message.message}</p>
    // <div
    //   className={cn('p-2 bg-slate-400 mt-2 rounded-md', {
    //     ['bg-slate-200 text-right']: isMine,
    //   })}
    // >
    //   <p className="text-xs">{createdAt}</p>
    //   <p className="text-l font-bold">{author}</p>
    //   <p className="break-words">{message}</p>
    // </div>
  )
}
