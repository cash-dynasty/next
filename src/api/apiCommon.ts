import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '@prisma/client'
import {
  RegisterAccountApiArg,
  RegisterAccountApiResponse,
  SendConfirmationMailApiArg,
  SendConfirmationMailApiResponse,
} from '@types'

type GetPostsApiResponse = Post[]

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsApiResponse, void>({
      query: () => `/posts`,
    }),
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
  }),
})

export const { useGetPostsQuery, useRegisterAccountMutation, useSendConfirmationMailMutation } =
  commonApi
