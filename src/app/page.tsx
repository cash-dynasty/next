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
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button label="ATAKUJ" />
        {/*<MenuBar />*/}
        <Link href={'/start'}>Go to start</Link>
        <Link href={'/auth/register'}>Register nju account</Link>
        <Button label="Wyslij email" onClick={sendMail} />
        <Posts />
      </div>
    </div>
  )
}
