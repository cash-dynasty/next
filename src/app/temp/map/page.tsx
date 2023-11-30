'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utils/styles'
import { Button } from '@atoms'

const MAP_DIMENSIONS_ROW = 90
const MAP_DIMENSIONS_COL = 90
const FIELD_SIZE = 10

function Map() {
  const [map, setMap] = useState([])
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number } | null>(null)
  const [north, setNorth] = useState<{ x: number; y: number } | null>(null)
  const [south, setSouth] = useState<{ x: number; y: number } | null>(null)
  const [inCircle, setInCircle] = useState<{ x: number; y: number }[] | null>(null)
  const [mapRadius, setMapRadius] = useState<number>(0)
  const [cords, setCords] = useState<string>('')

  useEffect(() => {
    const map = []
    for (let i = 0; i < MAP_DIMENSIONS_ROW; i++) {
      const mapRow = []
      for (let j = 0; j < MAP_DIMENSIONS_COL; j++) {
        mapRow.push(null)
      }
      map.push(mapRow)
    }
    setMap(map)
  }, [])

  const generateRingAroundCoords = (x, y, radius) => {
    return [
      { x: x - radius, y: y - radius },
      { x: x - radius, y: y },
      { x: x - radius, y: y + radius },
      { x: x, y: y - radius },
      { x: x, y: y + radius },
      { x: x + radius, y: y - radius },
      { x: x + radius, y: y },
      { x: x + radius, y: y + radius },
    ]
  }

  const updateField = (x, y) => {
    const tempMap = [...map]
    const val = tempMap[x][y]
    tempMap[x][y] = {
      x,
      y,
      ocupied: 'user',
    }
    const ring = generateRingAroundCoords(x, y, 1)
    const numbers: number[] = []
    for (let i = 0; i < 3; i++) {
      let randomNumber = null
      do {
        randomNumber = Math.floor(Math.random() * 7)
      } while (numbers.includes(randomNumber))
      numbers.push(randomNumber)
    }
    ring.forEach((el, index) => {
      if (numbers.includes(index)) {
        tempMap[el.x][el.y] = {
          x: el.x,
          y: el.y,
          ocupied: 'npc',
        }
      } else {
        tempMap[el.x][el.y] = {
          x: el.x,
          y: el.y,
          ocupied: 'empty',
        }
      }
    })
    setMap(tempMap)
  }

  const getMapCenter = () => {
    const center = {
      x: Math.floor(MAP_DIMENSIONS_ROW / 2),
      y: Math.floor(MAP_DIMENSIONS_COL / 2),
    }
    setMapCenter(center)
  }

  const elementsInsideCircle = () => {
    const center = mapCenter
    const radius = mapRadius
    const elements = []
    if (!center) {
      return
    }
    for (let i = 0; i < MAP_DIMENSIONS_ROW; i++) {
      for (let j = 0; j < MAP_DIMENSIONS_COL; j++) {
        const distance = Math.sqrt(Math.pow(center.x - i, 2) + Math.pow(center.y - j, 2))
        if (distance <= radius) {
          elements.push({ x: i + 1, y: j + 1 })
        }
      }
    }
    setInCircle(elements)
  }

  const calculateMinRadius = () => {
    const north = map.findIndex((row) => row.includes(2))
    if (north === -1) {
      return
    }
    if (north > -1) {
      setNorth({ x: north, y: Math.floor(MAP_DIMENSIONS_COL / 2) })
    }
    const south = map.findLastIndex((col) => col.includes(2))
    if (south > -1) {
      setSouth({ x: south, y: Math.floor(MAP_DIMENSIONS_COL / 2) })
    }

    const radiusNS = mapCenter && Math.max(mapCenter?.y - north, south - mapCenter?.y)

    setMapRadius(radiusNS || 0)

    const west = map.map((row, index) => row[index])
    const eastWest = map.reduce((acc, row) => {
      let west = null
      let east = null
      const westIndex = row.findIndex((field) => field === 2)
      if (westIndex > -1) {
        west = !acc.west ? westIndex : Math.min(acc.west, westIndex)
      }
      const reversedRow = [...row].reverse()
      const eastIndex = reversedRow.findIndex((el) => el === 2)
      if (eastIndex > -1) {
        east = !acc.east ? eastIndex : Math.max(acc.east, westIndex)
      }
      return {
        ...acc,
        west: !acc.west ? west : acc.west,
        east: !acc.east ? east : acc.east,
      }
    }, {})

    const radius = map.reduce((acc, row, index) => {
      const rowWithCompany = row.findIndex((el) => el === 2)
      const reversedRow = [...row].reverse()
      if (rowWithCompany === -1) {
        return acc
      } else {
        const firstWest = row.findIndex((el) => el === 2)
        const firstEast = reversedRow.findIndex((el) => el === 2)
        let westCoordinates = firstWest + 1
        if (acc.westCoordinates && acc.westCoordinates < westCoordinates) {
          westCoordinates = acc.westCoordinates
        }

        let eastCoordinates = MAP_DIMENSIONS_COL - firstEast
        if (acc.eastCoordinates && acc.eastCoordinates < eastCoordinates) {
          eastCoordinates = acc.eastCoordinates
        }
        return {
          ...acc,
          northCoordinates: !acc.northCoordinates ? index + 1 : acc.northCoordinates,
          southCoordinates: index + 1,
          westCoordinates: !acc.westCoordinates ? westCoordinates : acc.westCoordinates,
          eastCoordinates: !acc.eastCoordinates ? eastCoordinates : acc.eastCoordinates,
        }
      }
    }, {})
  }

  const createCompany = () => {
    // debugger
    const tempMap = [...map]

    let distanceMin = Infinity
    let najlepszaPozycja = { x: 0, y: 0 }

    for (let y = 0; y < MAP_DIMENSIONS_ROW; y++) {
      for (let x = 0; x < MAP_DIMENSIONS_ROW; x++) {
        if (tempMap[x][y] === null) {
          const radius = Math.sqrt(Math.pow(mapCenter.x - x, 2) + Math.pow(mapCenter.y - y, 2))
          if (radius < distanceMin) {
            distanceMin = radius
            najlepszaPozycja = { x, y }
          }
        }
      }
    }
    if (najlepszaPozycja.x < mapCenter.x) {
      najlepszaPozycja = { ...najlepszaPozycja, x: najlepszaPozycja.x - 1 }
    } else {
      najlepszaPozycja = {
        ...najlepszaPozycja,
        x: najlepszaPozycja.x + 1,
      }
    }
    if (najlepszaPozycja.y < mapCenter.y) {
      najlepszaPozycja = {
        ...najlepszaPozycja,
        y: najlepszaPozycja.y - 1,
      }
    } else {
      najlepszaPozycja = {
        ...najlepszaPozycja,
        y: najlepszaPozycja.y + 1,
      }
    }
    updateField(najlepszaPozycja.x, najlepszaPozycja.y)
  }

  let interval = 0
  const autoCreate = () => {
    const create = setInterval(() => {
      createCompany()
      interval++
      console.log(interval)
      if (interval >= 900) {
        clearInterval(create)
      }
    }, 50)
  }

  useEffect(() => {
    calculateMinRadius()
    getMapCenter()
    elementsInsideCircle()
  }, [map])

  return (
    <div className="w-full min-h-screen bg-slate-500 flex flex-col justify-center items-center">
      <div className="relative">
        {map.map((el, rowIndex) => (
          <div className="flex">
            {el.map((cell, colIndex) => (
              <div
                className={cn(`border-1 bg-green-200`, {
                  'bg-yellow-500': inCircle?.find(
                    (el) => el.x === rowIndex + 1 && el.y === colIndex + 1,
                  ),
                  'bg-red-200': cell?.ocupied === 'user' || undefined,
                  'bg-gray-200': cell?.ocupied === 'empty' || undefined,
                  'bg-blue-500': cell?.ocupied === 'npc' || undefined,
                  'bg-black':
                    (north && rowIndex === north.x && colIndex === north.y) ||
                    (south && rowIndex === south.x && colIndex === south.y),
                  'bg-green-800': mapCenter && rowIndex === mapCenter.x && colIndex === mapCenter.y,
                })}
                style={{ width: `${FIELD_SIZE}px`, height: `${FIELD_SIZE}px` }}
                // onClick={() => setCords(`x: ${rowIndex + 1}, y: ${colIndex + 1}`)}
                onClick={() => updateField(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      Radius
      <p>Cords {cords}</p>
      <Button label="Utwórz firmę" onClick={createCompany} />
      <Button label="Auto create" onClick={autoCreate} />
    </div>
  )
}

export default Map
