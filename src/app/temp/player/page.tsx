'use client'
import { useGetPlayerInfoQuery } from '@/api'
// import { CurrentBalance } from '@molecules'
import axios from 'axios'
import React from 'react'
import { calculateIncomePerSecond } from '@/utils/game'
import { Button } from '@atoms'
import { useCurrentBalance } from '@hooks'
import { useSession } from 'next-auth/react'
// import { Player as PlayerType } from '@prisma/client'

export default function Player() {
  // const [buildings, setBuildings] = useState(start)
  const session = useSession()
  console.log(session)
  const { data, isLoading, isError, refetch } = useGetPlayerInfoQuery()
  const { currentBalance } = useCurrentBalance(data?.playerData)

  const handleTest = async () => {
    await axios
      .post('http://localhost:3000/api/game/start', {
        sector: 'MEDIC',
        nickname: 'Vezo',
      })
      .then((res) => {
        console.log(res)
      })
  }

  if (isError) {
    return (
      <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
        error
        <Button label={'test'} onClick={handleTest} />
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
        <div className="max-h-96 overflow-y-scroll">
          {
            data?.playerData && <pre>{JSON.stringify(data.playerData, null, 2)}</pre>
            // Object.entries(data?.playerData).map(([key, value]) => (
            //   <p key={key}>
            //     {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            //     {/*@ts-ignore*/}
            //     {key} - {value}
            //   </p>
            // ))}
          }
        </div>
      )}
      <p>Przychód na sekundę: {calculateIncomePerSecond(data?.playerData.income || 0)}</p>
      <p>Aktualny stan konta: ${currentBalance}</p>
      <Button label={'Zarabiaj'} onClick={handleClick} />
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
