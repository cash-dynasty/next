import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

type TPathRole = {
  path: string
  role: string[]
}

const paths: TPathRole[] = [
  { path: '/admin', role: ['admin', 'moderator'] },
  { path: '/panel', role: ['user'] },
]

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const requestPath = request.nextUrl.pathname
    const requestToken = request.nextauth.token
    const currentPath = paths.find((path) => path.path === requestPath)

    if (
      currentPath &&
      requestToken &&
      request.nextUrl.pathname.startsWith(currentPath.path) &&
      !currentPath.role.includes(requestToken.role)
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = { matcher: ['/admin', '/panel'] }
