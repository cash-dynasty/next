import { ChatUsersListItem } from './parts'
import { useGetUsersQuery } from '@/api'
import 'tailwindcss/tailwind.css'

export const ChatUsersList = () => {
  const usersList = useGetUsersQuery()

  const liStyle = 'w-1/3 bg-gray-200 text-center'

  console.log(usersList.data?.usersList)
  return (
    <div className="w-[300px] bg-gray-400 p-2 flex flex-col justify-center ">
      <h2 className="py-2">Chat users list</h2>
      <div>
        <ul className="flex w-[100%] justify-around">
          <li className={liStyle}>All</li>
          <li className={liStyle}>Friends</li>
        </ul>
      </div>
      {usersList.data?.usersList.map((user) => <ChatUsersListItem user={user} key={user?.id} />)}
    </div>
  )
}
