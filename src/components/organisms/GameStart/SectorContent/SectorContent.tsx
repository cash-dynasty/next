'use client'
import { Button } from '@/components/atoms'
import { selectors, setGameStartSector } from '@/store/slices/game/game.slice'
import { useDispatch, useSelector } from 'react-redux'
import { Sector } from '@prisma/client'

export const SectorContent = () => {
  const tailClass =
    'w-[20vh] h-[20vh] bg-[#DE8F74] hover:bg-primary-50 cursor-pointer m-1 flex justify-center items-center font-semibold text-xl text-white rounded'

  const { sector: selectedSector } = useSelector(selectors.selectGameStart)

  const sectors: Sector[] = ['IT', 'ARMY', 'FINANCE', 'MEDIC']

  const dispatch = useDispatch()

  const handleSelectSector = (sector: Sector) => {
    dispatch(setGameStartSector(sector))
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 ">
        {sectors.map((sector, index) => (
          <div
            key={index}
            className={selectedSector == sector ? `bg-primary-50 ${tailClass}` : tailClass}
            onClick={() => handleSelectSector(sector)}
          >
            {sector}
          </div>
        ))}
      </div>
      <Button label={'Select'} />
    </div>
  )
}
