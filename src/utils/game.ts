import { Player } from '@prisma/client'

export const calculateIncomePerSecond = (income: Player['income']) => {
  return income / 60 / 60
}
