'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@atoms'
import Big from 'big.js'

type CurrentMoneyIndicatorProp = {
  updateInterval?: number
  startValue?: number
  valueGrowthPerSecond?: number
  decimals?: number
}

const DIGITS_ARRAY = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const CurrentMoneyIndicator = ({
  updateInterval = 5000,
  startValue = 0,
  valueGrowthPerSecond = 1,
  decimals,
}: CurrentMoneyIndicatorProp) => {
  const [value, setValue] = useState(startValue)

  const formatValue = (value: number) => {
    const fixedValue = decimals ? value.toFixed(decimals) : value
    const DIGITS_DOUBLE_ARRAY = DIGITS_ARRAY.concat(DIGITS_ARRAY)
    const split = fixedValue.toString().split('')
    return split.map((digit, i) => {
      if (digit === '.' || digit === ',')
        return (
          <span key={i} className="text-2xl font-bold text-black">
            {digit}
          </span>
        )
      const index = DIGITS_ARRAY.indexOf(digit)
      return (
        <div
          key={i}
          className="transition transition-transform duration-100 ease-linear text-2xl font-bold text-black h-[32px] flex flex-col-reverse"
          style={{ transform: `translateY(${index * 100}%)` }}
        >
          {DIGITS_DOUBLE_ARRAY.map((d, i) => (
            <span className="text-center" key={i}>
              {d}
            </span>
          ))}
        </div>
      )
    })
  }

  const handleUpdateValue = () => {
    const growth = Big(valueGrowthPerSecond || Math.floor(Math.random() * 1000) + 1)
    const updateIntervalInSeconds = Big(updateInterval).div(1000)
    setValue((prev) => +growth.mul(updateIntervalInSeconds).add(prev))
  }

  useEffect(() => {
    setTimeout(() => {
      handleUpdateValue()
    }, updateInterval)
  }, [value])

  return (
    <div className="p-5 bg-amber-200">
      <div className="overflow-hidden flex">{formatValue(value)}</div>
      <Button onClick={handleUpdateValue} label="add" />
    </div>
  )
}
