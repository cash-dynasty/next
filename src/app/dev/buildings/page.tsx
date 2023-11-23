'use client'
import { buildings } from '@/schemas/buildings'
import { ChangeEvent, useMemo, useState } from 'react'
import { Building } from '@/types/building'
import * as R from 'ramda'

export default function Buildings() {
  const [budildings, setBuildings] = useState(buildings)
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)
  const [isEdit, setIsEdit] = useState(true)

  const findBuildingById = (id: string) => {
    return buildings.find((el) => el.id === id)
  }

  const handleChangeBuilding = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const building = findBuildingById(e.target.value) || null
    setSelectedBuilding(building)
  }

  const handleClickSave = (buildingId: string) => {
    const originalBuilding = findBuildingById(buildingId)
    if (originalBuilding) {
      const isSame = R.equals(originalBuilding, selectedBuilding)
    }
  }

  const handleUpdateBuilding = (field: keyof Building, value: string | number) => {
    setSelectedBuilding((prev: Building | null) => {
      // Cast prev to Building to ensure the structure matches
      const buildingPrev = prev as Building

      return { ...buildingPrev, [field]: value }
    })
  }

  const buildingsIdsList = useMemo(
    () =>
      buildings.map((b) => {
        return b.id
      }),
    [buildings],
  )

  // const handleUpdateRequiredBuilding = (lvl: number, oldVal: string, newVal: string) => {
  //   setSelectedBuilding((prev: Building | null) => {
  //     // Cast prev to Building to ensure the structure matches
  //     const buildingPrev = prev as Building;
  //
  //     const requirementIndex = buildingPrev.requirements.findIndex((el) => el.lvl === lvl)
  //     // const requirements = prev?.requirements.find((el) => el.lvl === lvl)?.requiredBuildings
  //
  //     const req = prev?.requirements[requirementIndex] =
  //
  //     return { ...buildingPrev, requirements[field]: value }
  //   });
  // }

  const generateForm = () => {
    return (
      <>
        <select onChange={handleChangeBuilding}>
          {buildings.map((b) => {
            return (
              <option key={b.id} value={b.id}>
                {b.id} - {b.name}
              </option>
            )
          })}
        </select>
        {!selectedBuilding ? (
          'Wybierz budynek'
        ) : (
          <div key={selectedBuilding.id} className="py-8 border-black flex flex-col gap-4 ">
            <label>
              <p>ID budynku:</p>
              <input
                className="w-full"
                value={selectedBuilding.id}
                disabled={isEdit}
                onChange={({ target }) => handleUpdateBuilding('id', target.value)}
              />
            </label>
            <label>
              <p>Nazwa budynku:</p>
              <input
                className="w-full"
                name="building_name"
                value={selectedBuilding.name}
                onChange={({ target }) => handleUpdateBuilding('name', target.value)}
              />
            </label>
            <label>
              <p>Sektor:</p>
              <select
                className="w-full"
                name="sector"
                value={selectedBuilding.sector}
                onChange={({ target }) => handleUpdateBuilding('sector', target.value)}
              >
                <option value="IT">IT</option>
                <option value="MEDIC">MEDIC</option>
                <option value="FINANCE">FINANCE</option>
                <option value="ARMY">ARMY</option>
              </select>
            </label>
            <label>
              <p>Maksymalny poziom budynku:</p>
              <input
                className="w-full"
                name="building_max_level"
                value={selectedBuilding.maxLevel}
                onChange={({ target }) => handleUpdateBuilding('maxLevel', +target.value)}
                type="number"
              />
            </label>
            <label>
              <p>Opis budynku:</p>
              <textarea
                className="w-full"
                name="building_desc"
                value={selectedBuilding.description}
                onChange={({ target }) => handleUpdateBuilding('description', target.value)}
              />
            </label>
            <div>
              <p className="font-bold">Wymagania ulepszenia:</p>
              <div className="pl-4">
                <table className="w-full text-left">
                  <thead className="uppercase bg-gray-700 text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Poziom
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Koszt
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Wymagane budynki
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBuilding.requirements.map((el) => (
                      <tr className="border-b-1 bg-gray-800 border-gray" key={el.lvl}>
                        <td className="px-6 py-3">{el.lvl}</td>
                        <td className="px-6 py-3">
                          <input
                            type="number"
                            value={el.upgradePrice || 0}
                            maxLength={10}
                            className="w-[100px]"
                          />
                        </td>
                        <td className="px-6 py-3">
                          {el.requiredBuildings
                            ? Object.entries(el.requiredBuildings).map(([building, lvl]) => (
                                <div
                                  className="flex justify-between items-center gap-2"
                                  key={`${building}-${lvl}`}
                                >
                                  <select
                                    placeholder="budynek"
                                    value={building}
                                    className="w-[200px]"
                                  >
                                    {buildings.map((b) => (
                                      <option key={b.id} value={b.id}>
                                        {b.id}
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    placeholder="poziom"
                                    value={lvl}
                                    className="w-[50px]"
                                    type="number"
                                  />
                                </div>
                              ))
                            : null}
                          <button>Dodaj budynek</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               
              </div>
            </div>
            <button onClick={() => handleClickSave(selectedBuilding.id)}>Zapisz</button>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="grid grid-cols-[2fr_1fr] p-4 gap-2 h-screen font-saira">
      <div className="bg-orange-200 overflow-y-scroll h-full p-2">{generateForm()}</div>
      <div className="grid grid-rows-2 gap-2 h-full max-h-screen">
        <div className="bg-orange-200 overflow-y-scroll p-2">
          <p className="font-bold">Wybrany budynek:</p>
          <pre className="text-xs">{JSON.stringify(selectedBuilding, null, 2)}</pre>
        </div>
        <div className="bg-orange-200 overflow-y-scroll p-2">
          <p className="font-bold">Pełna lista budynków:</p>
          <pre className="text-xs">{JSON.stringify(budildings, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
