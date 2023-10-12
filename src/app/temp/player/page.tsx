'use client'

import { useGetPlayerInfoQuery } from '@/api'
import { calculateIncomePerSecond } from '@/utils/game'
// import { CurrentBalance } from '@molecules'
import { useCurrentBalance } from '@hooks'
import { Button } from '@atoms'
import axios from 'axios'
// import { Player as PlayerType } from '@prisma/client'

export default function Player() {
  const { data, isLoading, isError, refetch } = useGetPlayerInfoQuery()
  const { currentBalance } = useCurrentBalance(data?.playerData)

  if (isError) {
    return (
      <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
        error
      </div>
    )
  }

  const handleClick = async () => {
    await axios.put('http://localhost:3000/api/player/updateBalance').then((res) => {
      console.log(res)
      refetch()
    })
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
          <p>Przychód na sekundę: {calculateIncomePerSecond(data?.playerData.income || 0)}</p>
          <p>Aktualny stan konta: ${currentBalance}</p>
          <Button label={'Zarabiaj'} onClick={handleClick} />
        </div>
      )}
    </div>
  )
}
