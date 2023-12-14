// import { useEffect, useState } from 'react'
// import { calculateIncomePerSecond } from '@/utils/game'
// import dayjs from 'dayjs'
// import { TPlayerSelect } from '@/db/schema'

// export const useCurrentBalance = (playerData?: TPlayerSelect) => {
//   const [amount, setAmount] = useState(playerData?.moneyBalance || 0)

//   useEffect(() => {
//     const incomePerSecond = calculateIncomePerSecond(playerData?.moneyIncome || 0)
//     const interval = setInterval(() => {
//       const currentIncomeAmount =
//         dayjs().diff(dayjs(playerData?.lastBalanceUpdate), 'second') * incomePerSecond
//       console.log((playerData?.moneyBalance || 0) + currentIncomeAmount)
//       setAmount((playerData?.moneyBalance || 0) + currentIncomeAmount)
//     }, 1000)
//     return () => clearInterval(interval)
//   }, [playerData])

//   return {
//     currentBalance: amount.toFixed(2),
//   }
// }

export const useCurrentBalance = () => {
  return 1
}
