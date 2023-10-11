'use client'

import { useGetPlayerInfoQuery } from '@/api'
// import { Player as PlayerType } from '@prisma/client'

export default function Player() {
  const { data, isLoading, isError } = useGetPlayerInfoQuery()

  console.log(data)

  if (isError) {
    return (
      <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
        error
      </div>
    )
  }

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.playerData &&
            Object.entries(data?.playerData).map(([key, value]) => (
              <p key={key}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-ignore*/}
                {key} - {value}
              </p>
            ))}
        </div>
      )}
    </div>
  )
}
