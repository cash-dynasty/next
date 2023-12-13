'use client'

import { useGetBuildingsQuery, useGetPlayerInfoQuery } from '@/api'

import { Button } from '@atoms'
import React from 'react'
import { SafeboxContent } from '@/components/organisms/SafeboxContent'
// import { CurrentBalance } from '@molecules'
import axios from 'axios'
// import { calculateIncomePerSecond } from '@/utils/game'
import { useCurrentBalance } from '@hooks'

// import { Player as PlayerType } from '@prisma/client'

export default function Player() {
  // const [buildings, setBuildings] = useState(start)
  const { data: buildingsData } = useGetBuildingsQuery({
    propertyId: 100001,
  })
  const { data, isLoading, isError, refetch } = useGetPlayerInfoQuery()
  const { currentBalance } = useCurrentBalance(data?.player)

  const handleTest = async () => {
    await axios
      .post('http://localhost:3000/api/game/start', {
        sector: 'MEDIC',
        nickname: 'wicherixen',
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
            data?.player && <pre>{JSON.stringify(buildingsData, null, 2)}</pre>
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
      {/* <p>Przychód na sekundę: {calculateIncomePerSecond(data?.player.moneyIncome || 0)}</p> */}
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
      <SafeboxContent />
    </div>
  )
}
