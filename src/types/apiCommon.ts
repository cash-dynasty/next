import { ErrorDataResponse, SuccessDataResponse } from './shared'

// registerAccount
export type RegisterAccountApiArg = {
  username: string
  password: string
  email: string
  gReCaptchaToken: string
}
export type RegisterAccountApiResponse = {
  status: number
  data: ErrorDataResponse | SuccessDataResponse
}

export type SendConfirmationMailApiArg = {
  mailTo: string
  confirmationToken: string
  validFor: Date
  username: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SendConfirmationMailApiResponse = any
