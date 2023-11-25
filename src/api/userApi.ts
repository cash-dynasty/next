import { api } from './api'
import type { DataResponse } from '@/types'
import { User } from '@prisma/client'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({
        url: `/user`,
      }),
    }),
    registerAccount: builder.mutation<RegisterAccountApiResponse, RegisterAccountApiArg>({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: 'POST',
        body: {
          password: queryArg.password,
          email: queryArg.email,
          gReCaptchaToken: queryArg.gReCaptchaToken,
        },
      }),
    }),
    confirmAccountRegistration: builder.mutation<
      ConfirmAccountRegistrationApiResponse,
      ConfirmAccountRegistrationApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/activate`,
        method: 'POST',
        body: {
          email: queryArg.email,
          confirmationToken: queryArg.confirmationToken,
        },
      }),
    }),
    createNewActivationToken: builder.mutation<
      CreateNewActivationTokenApiResponse,
      CreateNewActivationTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/recreateActivationToken`,
        method: 'POST',
        body: {
          token: queryArg.token,
          email: queryArg.email,
          gReCaptchaToken: queryArg.gReCaptchaToken,
          reason: queryArg.reason,
        },
      }),
    }),
  }),
})

//getUsers
export type GetUsersApiResponse = {
  status: number
  usersList: Partial<User[]>
  data: DataResponse
}
export type GetUsersApiArg = void

// registerAccount
export type RegisterAccountApiArg = {
  password: string
  email: string
  gReCaptchaToken: string
}
export type RegisterAccountApiResponse = {
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

export const userApi = injectedRtkApi

export const {
  useRegisterAccountMutation,
  useConfirmAccountRegistrationMutation,
  useCreateNewActivationTokenMutation,
  useGetUsersQuery,
} = injectedRtkApi
