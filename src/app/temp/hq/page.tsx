'use client'
import { useGetPlayerInfoQuery, useLazyGetPropertyQuery } from '@/api'
import { Button } from '@atoms'
import { cn } from '@/utils/styles'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useEffect } from 'react'
import { TBuildingsSelect } from '@/db/schema'

dayjs.extend(duration)

export default function Headquarter() {
  const { data: playerData, isLoading: isGetPlayerInfoLoading } = useGetPlayerInfoQuery()
  const [getProperty, { data, isLoading: isGetPropertyLoading }] = useLazyGetPropertyQuery()

  const isLoading = isGetPropertyLoading || isGetPlayerInfoLoading

  useEffect(() => {
    const propertyId = playerData?.player.property[0].id
    if (propertyId) {
      getProperty({ propertyId })
    }
  }, [playerData])

  const BuildingRow = ({ building }: { building: TBuildingsSelect }) => {
    console.log(building.configBuilding.buildingUpgradeRequirement)
    const isBuildingBuild = building.level > 0
    return (
      <div
        className={cn(
          'grid grid-cols-3 gap-2 items-center [&>:not(:first-child)]:text-center text-white',
          { ['text-orange-300']: !isBuildingBuild },
        )}
      >
        <p>
          {building.configBuilding.name} (Poziom {building.level})
        </p>
        <p>{building?.configBuilding.buildingUpgradeRequirement?.upgradePrice}</p>
        {building.level === building.configBuilding.maxLevel ? (
          <Button disabled>MAX</Button>
        ) : (
          <Button>
            <p>{isBuildingBuild ? `Poziom ${building.level + 1}` : 'Zbuduj'}</p>
            <p className="text-[12px]">
              (
              {dayjs
                .duration(
                  building.configBuilding.buildingUpgradeRequirement?.upgradeDuration || 0,
                  'seconds',
                )
                .format('H[h] m[m] s[s]')}
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
            {data?.property?.buildings?.map((building) => (
              <BuildingRow key={building.id} building={building} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
