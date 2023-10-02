import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ConfirmAccountRegistrationApiArg,
  ConfirmAccountRegistrationApiResponse,
  CreateNewActivationTokenApiArg,
  CreateNewActivationTokenApiResponse,
  RegisterAccountApiArg,
  RegisterAccountApiResponse,
  SendConfirmationMailApiArg,
  SendConfirmationMailApiResponse,
} from '@types'

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    registerAccount: builder.mutation<RegisterAccountApiResponse, RegisterAccountApiArg>({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: 'POST',
        body: {
          username: queryArg.username,
          password: queryArg.password,
          email: queryArg.email,
          gReCaptchaToken: queryArg.gReCaptchaToken,
        },
      }),
    }),
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
          username: queryArg.username,
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

export const {
  useRegisterAccountMutation,
  useSendConfirmationMailMutation,
  useConfirmAccountRegistrationMutation,
  useCreateNewActivationTokenMutation,
} = commonApi
