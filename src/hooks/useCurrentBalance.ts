import { useEffect, useState } from 'react'
import { calculateIncomePerSecond } from '@/utils/game'
import dayjs from 'dayjs'
import { Player } from '@prisma/client'

export const useCurrentBalance = (playerData?: Partial<Player>) => {
  const [amount, setAmount] = useState(playerData?.moneyBalance || 0)

  useEffect(() => {
    const incomePerSecond = calculateIncomePerSecond(playerData?.income || 0)
    const interval = setInterval(() => {
      const currentIncomeAmount =
        dayjs().diff(dayjs(playerData?.lastBalanceUpdate), 'second') * incomePerSecond
      console.log((playerData?.moneyBalance || 0) + currentIncomeAmount)
      setAmount((playerData?.moneyBalance || 0) + currentIncomeAmount)
    }, 100)
    return () => clearInterval(interval)
  }, [playerData])

  return {
    currentBalance: amount.toFixed(2),
  }
}
