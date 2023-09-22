// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '@prisma/client'

type GetPostsApiResponse = Post[]

// Define a service using a base URL and expected endpoints
export const firstApi = createApi({
  reducerPath: 'firstApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsApiResponse, void>({
      query: () => `/posts`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery } = firstApi
