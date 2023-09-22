import {ErrorDataResponse, SuccessDataResponse} from './shared';

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
