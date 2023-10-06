import { Message } from '@molecules'
import dayjs from 'dayjs'

export default function Chat() {
  const messageArray = [
    {
      id: 1,
      isMine: true,
      message:
        'ttesttesttesttesttesttestttesttesttesttesttesttestttesttesttesttesttesttestttesttesttesttesttesttestttesttesttesttesttesttest ttesttesttesttesttesttestttesttesttesttesttesttest',
      createdAt: dayjs().format('HH:mm DD.MM.YYYY'),
      author: 'Vezo',
    },
    {
      id: 2,
      isMine: false,
      message: 'false',
      createdAt: dayjs().format('HH:mm DD.MM.YYYY'),
      author: 'MarcinW',
    },
    {
      id: 3,
      isMine: true,
      message: 'test',
      createdAt: dayjs().format('HH:mm DD.MM.YYYY'),
      author: 'Vezo',
    },
    {
      id: 4,
      isMine: false,
      message: 'false',
      createdAt: dayjs().format('HH:mm DD.MM.YYYY'),
      author: 'MarcinW',
    },
  ]
  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <h1>Chat</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <div>
          {messageArray.map((item) => (
            <Message
              key={item.id}
              isMine={item.isMine}
              message={item.message}
              createdAt={item.createdAt}
              author={item.author}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
