import { api } from './api'
import type { DataResponse } from '@/types'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendConfirmationMail: builder.mutation<
      SendConfirmationMailApiResponse,
      SendConfirmationMailApiArg
    >({
      query: (queryArg) => ({
        url: `/mailing/confirmationMail`,
        method: 'POST',
        body: {
          mailTo: queryArg.mailTo,
          confirmationToken: queryArg.confirmationToken,
          validFor: queryArg.validFor,
        },
      }),
    }),
  }),
})

// sendConfirmationMail
export type SendConfirmationMailApiArg = {
  mailTo: string
  confirmationToken: string
  validFor: Date | string
}
export type SendConfirmationMailApiResponse = {
  status: number
  data: DataResponse
}

export const commonApi = injectedRtkApi

export const { useSendConfirmationMailMutation } = injectedRtkApi
