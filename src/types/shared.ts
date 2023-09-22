export type ErrorDataResponse = {
  status: 'fail'
  error: string
  message: never
}
export type SuccessDataResponse = {
  status: 'ok'
  message: string
  error: never
}
