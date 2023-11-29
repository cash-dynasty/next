'use client'
// import { buildings } from '@/schemas/buildings'
import { ChangeEvent, useEffect, useState } from 'react'
// import { Building } from '@/types/building'
import {
  useCreateBuildingConfigMutation,
  useCreateBuildingRequirementConfigMutation,
  useGetBuildingsConfigQuery,
  useUpdateBuildingConfigMutation,
} from '@api/devApi'
import {
  TCBuilding,
  TCBuildingUpgradeRequirementSelect,
  TCRequiredBuildingSelect,
} from '@/db/schema'
import { Button } from '@atoms'
import * as R from 'ramda'

export default function Buildings() {
  const [buildings, setBuildings] = useState<TCBuilding[] | null>(null)
  const [selectedBuilding, setSelectedBuilding] = useState<TCBuilding | null>(null)
  const [isEdit, setIsEdit] = useState(true)
  const [newBuilding, setNewBuilding] = useState<Partial<TCBuilding> | null>(null)

  const { data, refetch } = useGetBuildingsConfigQuery()
  const [createBuilding] = useCreateBuildingConfigMutation()
  const [updateBuilding] = useUpdateBuildingConfigMutation()
  const [createBuildingUpgradeRequirement] = useCreateBuildingRequirementConfigMutation()

  useEffect(() => {
    if (data && data.buildings) {
      setBuildings(data.buildings)
    }
  }, [data])

  useEffect(() => {
    console.log('useEffect', !!buildings?.length, selectedBuilding)
    if (!!buildings?.length && selectedBuilding) {
      const idx = buildings.findIndex((el) => el.id === selectedBuilding.id)
      setSelectedBuilding(buildings[idx])
      return
    } else if (buildings && buildings.length > 0) setSelectedBuilding(buildings?.[0] || null)
  }, [buildings])

  const handleSaveBuilding = async () => {
    if (isEdit) {
      if (selectedBuilding) {
        await updateBuilding(selectedBuilding)
          .unwrap()
          .then((res) => {
            console.log('update', res)
            refetch()
              .unwrap()
              .then((refetched) => {
                setBuildings(refetched.buildings)
                console.log('refetch', refetched.buildings, res.building[0].id)
                const idx = refetched.buildings.findIndex((el) => el.id === res.building[0].id)
                setIsEdit(true)
                console.log('refetched', refetched.buildings[idx])
                setSelectedBuilding(refetched.buildings[idx])
              })
          })
      }
    } else {
      if (newBuilding) {
        console.log(newBuilding)
        await createBuilding(newBuilding)
          .unwrap()
          .then(() => {
            refetch()
              .unwrap()
              .then((refetched) => {
                setBuildings(refetched.buildings)
              })
          })
      }
    }
  }

  const findBuildingById = (id: number) => {
    return !!buildings && buildings.find((el) => el.id === id)
  }

  const handleSelectBuilding = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const building = findBuildingById(+e.target.value) || null
    setSelectedBuilding(building)
  }

  const onCreateNewBuildingClick = () => {
    if (!isEdit) {
      setIsEdit(true)
      setNewBuilding(null)
    } else {
      setIsEdit(false)
      setNewBuilding({
        maxLevel: 1,
        name: '',
        codeName: '',
        sector: 'IT',
        description: '',
      })
    }
  }

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

  const handleUpdateBuilding = (field: string, value: string | number) => {
    isEdit
      ? setSelectedBuilding((prev: TCBuilding | null) => {
          const buildingPrev = prev as TCBuilding
          return { ...buildingPrev, [field]: value }
        })
      : setNewBuilding((prev: Partial<TCBuilding> | null) => {
          const buildingPrev = prev as TCBuilding
          return { ...buildingPrev, [field]: value }
        })
  }

  const handleUpdateBuildingUpgradePrice = (id: number, value: string) => {
    setSelectedBuilding((prev: TCBuilding | null) => {
      const buildingPrev = R.clone(prev) as TCBuilding

      if (!buildingPrev.buildingUpgradeRequirement) return null
      const updateIndex = buildingPrev.buildingUpgradeRequirement?.findIndex((el) => el.id === id)

      if (updateIndex === -1) return null

      buildingPrev.buildingUpgradeRequirement[updateIndex].upgradePrice = +value
      return buildingPrev || null
    })
  }

  const handleAddRequirementLevel = async () => {
    if (selectedBuilding) {
      let level = 1
      const requiredLevelsLength = selectedBuilding?.buildingUpgradeRequirement?.length || 0
      if (requiredLevelsLength >= selectedBuilding.maxLevel) return
      if (requiredLevelsLength === 0) {
        level = 1
      } else {
        const lastLevel = selectedBuilding?.buildingUpgradeRequirement?.[requiredLevelsLength - 1]
        level = !!lastLevel ? lastLevel?.level + 1 : 1
      }
      const newLevel = {
        buildingId: selectedBuilding.id,
        level,
        upgradePrice: 0,
      }
      await createBuildingUpgradeRequirement(newLevel)
        .unwrap()
        .then((res) => {
          console.log('newLevel', res)
          refetch()
        })
    }
  }

  const handleAddRequiredBuilding = (buildingUpgradeRequirementId: number) => {
    console.log('handleAddRequiredBuilding', buildingUpgradeRequirementId)
    if (buildings)
      setSelectedBuilding((prev: TCBuilding | null) => {
        const buildingPrev = R.clone(prev) as TCBuilding

        const emptyRequiredBuilding: Partial<TCRequiredBuildingSelect> = {
          buildingId: buildings[0].id,
          requiredBuildingLevel: 1,
          buildingUpgradeRequirementId,
        }

        const buildingRequirementIndex =
          buildingPrev.buildingUpgradeRequirement?.findIndex(
            (el) => el.id === buildingUpgradeRequirementId,
          ) ?? -1

        if (buildingRequirementIndex > -1) {
          buildingPrev.buildingUpgradeRequirement?.[
            buildingRequirementIndex
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
          ].requiredBuilding?.push(emptyRequiredBuilding)
        }

        return buildingPrev || null
      })
  }

  const editForm = () => {
    const formData = isEdit ? selectedBuilding : newBuilding

    return (
      <>
        {!!formData && (
          <div key={formData.id} className="py-8 border-black flex flex-col gap-4 ">
            <label>
              <p>ID budynku:</p>
              <input
                className="w-full"
                value={formData.id}
                disabled={true}
                onChange={({ target }) => handleUpdateBuilding('id', target.value)}
              />
            </label>
            <label>
              <p>Nazwa kodowa budynku:</p>
              <input
                className="w-full"
                name="building_code_name"
                value={formData.codeName}
                disabled={isEdit}
                onChange={({ target }) => handleUpdateBuilding('codeName', target.value)}
              />
            </label>
            <label>
              <p>Nazwa budynku:</p>
              <input
                className="w-full"
                name="building_name"
                value={formData.name}
                onChange={({ target }) => handleUpdateBuilding('name', target.value)}
              />
            </label>
            <label>
              <p>Sektor:</p>
              <select
                className="w-full"
                name="sector"
                value={formData.sector}
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
                value={formData.maxLevel}
                onChange={({ target }) => handleUpdateBuilding('maxLevel', +target.value)}
                type="number"
              />
            </label>
            <label>
              <p>Opis budynku:</p>
              <textarea
                className="w-full"
                name="building_desc"
                value={formData.description || ''}
                onChange={({ target }) => handleUpdateBuilding('description', target.value)}
              />
            </label>
            {isEdit && (
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
                        <th scope="col" className="px-6 py-3">
                          Wymagany poziom budynku
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData?.buildingUpgradeRequirement?.map(
                        (el: TCBuildingUpgradeRequirementSelect) => (
                          <tr className="border-b-1 bg-gray-800 border-gray" key={el.level}>
                            <td className="px-6 py-3">{el.level}</td>
                            <td className="px-6 py-3">
                              <input
                                // type="number"
                                value={el.upgradePrice}
                                maxLength={10}
                                className="w-[100px]"
                                onChange={({ target }) =>
                                  handleUpdateBuildingUpgradePrice(el.id, target.value)
                                }
                              />
                            </td>
                            <td>
                              <div className="flex flex-col gap-2">
                                {el.requiredBuilding?.map((rb) => (
                                  <select key={rb.id} onChange={handleSelectBuilding}>
                                    {!!buildings &&
                                      buildings.map((b: TCBuilding) => {
                                        return (
                                          <option key={b.id} value={b.id}>
                                            {b.codeName} - {b.name}
                                          </option>
                                        )
                                      })}
                                  </select>
                                ))}
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-col gap-2">
                                {el.requiredBuilding?.map((rb) => <select key={rb.id}></select>)}
                              </div>
                            </td>
                            <td className="px-6 py-3">
                              <Button
                                label="Dodaj budynek"
                                onClick={() => handleAddRequiredBuilding(el.id)}
                              />
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
                {formData.buildingUpgradeRequirement &&
                formData.maxLevel &&
                formData?.buildingUpgradeRequirement?.length >= formData?.maxLevel ? null : (
                  <Button label="Dodaj poziom" fullWidth onClick={handleAddRequirementLevel} />
                )}
              </div>
            )}
            <button onClick={handleSaveBuilding}>{isEdit ? 'Zapisz' : 'Utwórz'}</button>
          </div>
        )}
      </>
    )
  }

  if (!buildings) return <p>Ładowanie...</p>

  return (
    <div className="grid grid-cols-[2fr_1fr] p-4 gap-2 h-screen font-saira">
      <div className="bg-orange-200 overflow-y-scroll h-full p-2 flex flex-col">
        <select onChange={handleSelectBuilding}>
          {!!buildings &&
            buildings.map((b: TCBuilding) => {
              return (
                <option key={b.id} value={b.id}>
                  {b.codeName} - {b.name}
                </option>
              )
            })}
        </select>
        <Button
          label={!isEdit ? 'Anuluj tworzenie budynku' : 'Utwórz nowy budynek'}
          onClick={onCreateNewBuildingClick}
        />
        {editForm()}
      </div>
      <div className="grid grid-rows-2 gap-2 h-full max-h-screen">
        <div className="bg-orange-200 overflow-y-scroll p-2">
          <p className="font-bold">Wybrany budynek:</p>
          <pre className="text-xs">{JSON.stringify(selectedBuilding, null, 2)}</pre>
        </div>
        <div className="bg-orange-200 overflow-y-scroll p-2">
          <p className="font-bold">Pełna lista budynków:</p>
          <pre className="text-xs">{JSON.stringify(buildings, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
