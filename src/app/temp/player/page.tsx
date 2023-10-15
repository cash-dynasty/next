'use client'
import { useGetPlayerInfoQuery } from '@/api'
// import { CurrentBalance } from '@molecules'
import axios from 'axios'
import React from 'react'
import { calculateIncomePerSecond } from '@/utils/game'
import { Button } from '@atoms'
import { useCurrentBalance } from '@hooks'
// import { Player as PlayerType } from '@prisma/client'

export default function Player() {
  // const [buildings, setBuildings] = useState(start)
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

  // const handleUpgradeBuilding = (buildingName) => {
  //   const b = { ...buildings }
  //   b[buildingName].lvl++
  //   setBuildings(b)
  // }
  //
  // const hasRequirements = (buildingName) => {
  //   const req = buildings[buildingName].required
  //   if (!req) return true
  //   return Object.entries(req).every(([name, level]) => {
  //     const check = buildings[name].lvl >= level
  //     return check
  //   })
  // }

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
      {/*{Object.entries(buildings).map(([name, properties]) => (*/}
      {/*  <Button*/}
      {/*    label={`${name} (lv. ${properties.lvl === properties.maxLv ? 'MAX' : properties.lvl})`}*/}
      {/*    key={name}*/}
      {/*    fullWidth*/}
      {/*    disabled={!hasRequirements(name) || properties.maxLv === properties.lvl}*/}
      {/*    onClick={() => handleUpgradeBuilding(name)}*/}
      {/*  />*/}
      {/*))}*/}
    </div>
  )
}
