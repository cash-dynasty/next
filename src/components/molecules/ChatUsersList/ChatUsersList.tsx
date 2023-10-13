'use client'
import { ChatUsersListItem } from './parts'
import { useGetUsersQuery } from '@/api'

export const ChatUsersList = () => {
  const { data, isError } = useGetUsersQuery()

  const liStyle = 'w-1/3 bg-gray-200 text-center'

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="w-[300px] bg-gray-400 p-2 flex flex-col justify-center ">
      <h2 className="py-2">Chat users list</h2>
      <div>
        <ul className="flex w-[100%] justify-around">
          <li className={liStyle}>All</li>
          <li className={liStyle}>Friends</li>
        </ul>
      </div>
      {data &&
        data.usersList.map((user) =>
          user ? <ChatUsersListItem user={user} key={user?.id} /> : null,
        )}
    </div>
  )
}
