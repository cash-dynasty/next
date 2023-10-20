'use client'
import { Button } from '@atoms'
import { useGetPlayerInfoQuery } from '@/api'

export default function Headquarter() {
  const { data, isLoading } = useGetPlayerInfoQuery()
  if (isLoading) return 'Loading...'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const availableBuildings = data?.playerData.properties[0].buildings
  console.log(availableBuildings)

  return (
    <>
      <h1>Siedziba firmy</h1>
      <p>Rozbudowa:</p>

      <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
        {availableBuildings.map((building) => (
          <div key={building.configBuildingId} className="flex gap-5 items-center">
            <p>
              {building.configBuildingId} (Poziom {building.level})
            </p>
            <p>Czas rozbudowy</p>
            <p>koszt</p>
            <Button label="Rozbuduj" />
          </div>
        ))}
      </div>
    </>
  )
}
