import { DataResponse } from './shared'
import { Player } from '@prisma/client'

// registerAccount
export type RegisterAccountApiArg = {
  username: string
  password: string
  email: string
  gReCaptchaToken: string
}
export type RegisterAccountApiResponse = {
  status: number
  data: DataResponse
}

// GetPlayerInfo
export type GetPlayerInfoApiResponse = {
  status: number
  playerData: Partial<Player>
}
export type GetPlayerInfoApiArg = void

// sendConfirmationMail
export type SendConfirmationMailApiArg = {
  mailTo: string
  confirmationToken: string
  validFor: Date
  username: string
}
export type SendConfirmationMailApiResponse = {
  status: number
  data: DataResponse
}

// confirmAccountRegistration
export type ConfirmAccountRegistrationApiResponse = {
  status: number
  data: DataResponse
}
export type ConfirmAccountRegistrationApiArg = {
  email: string
  confirmationToken: string
}

// createNewActivationToken
export type CreateNewActivationTokenApiResponse = {
  status: number
  data: DataResponse
}
export type CreateNewActivationTokenApiArg = {
  email: string
  token?: string
  gReCaptchaToken: string
  reason: 'token_expired' | 'token_lost'
}
