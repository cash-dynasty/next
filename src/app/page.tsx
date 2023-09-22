'use client'
import { Button } from '@atoms/Button'

import Link from 'next/link'
import axios from 'axios'
import { useGetPostsQuery } from '@/api'

export default function Home() {
  const sendMail = async () => {
    await axios.get('http://localhost:3000/api/sendMail')
  }

  const { data, isLoading, refetch } = useGetPostsQuery()

  const Posts = () => {
    if (isLoading) return <div>Loading...</div>
    return (
      <>
        <div>
          {data?.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
        <Button label={'refetch'} onClick={() => refetch()} />
      </>
    )
  }

  return (
    <div className="h-screen bg-slate-700 flex flex-col gap-5">
      <Button label="ATAKUJ" />

      {/*<MenuBar />*/}
      <Link href={'/start'}>go to start</Link>

      <Link href={'/auth/register'}>Register nju account</Link>
      <Button label="send email" onClick={sendMail} />
      <Posts />
    </div>
  )
}
