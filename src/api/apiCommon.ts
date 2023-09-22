import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '@prisma/client'
import { RegisterAccountApiArg, RegisterAccountApiResponse } from '@types'

type GetPostsApiResponse = Post[]

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsApiResponse, void>({
      query: () => `/posts`,
    }),
    registerAccount: builder.mutation<
      RegisterAccountApiResponse,
      RegisterAccountApiArg
    >({
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
  }),
})

export const { useGetPostsQuery, useRegisterAccountMutation } = commonApi
