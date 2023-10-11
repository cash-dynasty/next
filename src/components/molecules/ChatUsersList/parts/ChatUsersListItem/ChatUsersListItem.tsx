import dayjs from 'dayjs'
import { User } from '@prisma/client'

type UsersListProp = {
  user: Partial<User>
}

export const ChatUsersListItem = ({ user }: UsersListProp) => {
  return (
    <div className="bg-gray-200 p-1 my-1 ">
      <div className="flex py-1 items-center justify-start">
        <div className="w-[30px] h-[30px] bg-gray-500 flex justify-center items-center mr-1">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        <p>{user.username}</p>
      </div>
      <p>Last seen: {dayjs(user.lastSeen).format('DD.MM.YYYY HH:mm:ss')}</p>
    </div>
  )
}
