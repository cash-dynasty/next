import { Socket, Server as NetServer } from 'net'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'
import { NextResponse } from 'next/server'

type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO
    }
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (!res.socket.server.io) {
    const path = '/api/ws'
    const httpServer: NetServer = res.socket.server
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    })
    res.socket.server.io = io
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}
