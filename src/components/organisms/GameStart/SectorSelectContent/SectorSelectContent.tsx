'use client'
import { Button } from '@/components/atoms'
import { selectors, setGameStartSector } from '@/store/slices/game.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useGameStartMutation } from '@/api'
import { cn } from '@/utils/styles'
import { handleRTKErrors } from '@/utils/api'
import { ESector, sector as sectorDrizzleEnum } from '@/db/schema'

export const SectorSelectContent = () => {
  const { sector: selectedSector } = useSelector(selectors.selectGameStart)
  const { nickname, sector } = useSelector(selectors.selectGameStart)

  const sectors = sectorDrizzleEnum.enumValues

  const dispatch = useDispatch()
  const [gameStart, { isSuccess, isError, error }] = useGameStartMutation()

  const handleSelectSector = (sector: ESector) => {
    dispatch(setGameStartSector(sector))
  }

  const handleStartGame = () => {
    console.log(nickname, sector)
    if (nickname && sector) {
      gameStart({
        nickname,
        sector,
      })
    }
  }

  const errorData = handleRTKErrors(error)

  return (
    <div className="flex flex-col justify-center items-center">
      {isSuccess && (
        <p className="p-4 bg-green-600 mt-2 w-full text-center text-white">
          Profil został utworzony pomyślnie
        </p>
      )}
      {isError && (
        <p className="p-4 bg-red-600 mt-2 w-full text-center text-white">
          Wystąpił błąd podczas tworzenia profilu {errorData}
        </p>
      )}
      <div className="grid grid-cols-2 ">
        {sectors.map((sector) => (
          <div
            key={sector}
            className={cn(
              'w-[20vh] h-[20vh] bg-[#DE8F74] hover:bg-primary-50 cursor-pointer m-1 flex justify-center items-center font-semibold text-xl text-white rounded',
              {
                ['bg-primary-50']:
                  selectedSector === (sector as unknown as typeof sectorDrizzleEnum.enumValues),
              },
            )}
            onClick={() =>
              handleSelectSector(sector as unknown as typeof sectorDrizzleEnum.enumValues)
            }
          >
            {sector}
          </div>
        ))}
      </div>
      <Button label="Utwórz" onClick={handleStartGame} disabled={!selectedSector} />
    </div>
  )
}
