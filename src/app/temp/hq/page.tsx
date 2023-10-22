'use client'
import { useGetPlayerInfoQuery, useLazyGetPropertyQuery } from '@/api'
import { Button } from '@atoms'
import { cn } from '@/utils/styles'
import { TPropertyBuilding } from '@/types/property'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export default function Headquarter() {
  const { data: playerData, isLoading: isGetPlayerInfoLoading } = useGetPlayerInfoQuery()
  const [getProperty, { data, isLoading: isGetPropertyLoading }] = useLazyGetPropertyQuery()

  const { property } = data || {}

  const isLoading = isGetPropertyLoading || isGetPlayerInfoLoading

  useEffect(() => {
    const propertyId = playerData?.playerData.properties[0].id
    if (propertyId) {
      getProperty({ propertyId })
    }
  }, [playerData])

  const BuildingRow = ({ building }: { building: TPropertyBuilding }) => {
    const isBuildingBuild = building.level > 0
    return (
      <div
        className={cn(
          'grid grid-cols-3 gap-2 items-center [&>:not(:first-child)]:text-center text-white',
          { ['text-orange-300']: !isBuildingBuild },
        )}
      >
        <p>
          {building.buildingName} (Poziom {building.level})
        </p>
        <p>{building?.upgrade?.price}</p>
        {building.level === building.maxLevel ? (
          <Button disabled>MAX</Button>
        ) : (
          <Button>
            <p>{isBuildingBuild ? `Poziom ${building.level + 1}` : 'Zbuduj'}</p>
            <p className="text-[12px]">
              (
              {dayjs.duration(building?.upgrade?.duration || 0, 'seconds').format('H[h] m[m] s[s]')}
              )
            </p>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <h1>Siedziba firmy</h1>
      <p>Rozbudowa:</p>

      <div className="h-full flex flex-col gap-4 justify-center items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col max-w-3xl gap-1">
            {property?.buildings?.map((building) => (
              <BuildingRow key={building.buildingId} building={building} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
