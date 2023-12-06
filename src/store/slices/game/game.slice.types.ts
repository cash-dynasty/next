import { Sector, User } from '@prisma/client'

type GameStart = {
  nickname: string
  sector: Sector | null

}

export type SetGameStartNicknamePayload = string

export type SetGameStartSectorPayload = Sector | null

export type GameState = {
  gameStart: GameStart
    selectedProperty: string | null
}
export type SetSelectedPropertyPayload = {
    propertyId: string
}
