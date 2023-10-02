// @ts-nocheck
// const express = require('express')
// const createServer = require('node:http').createServer
// const Server = require('socket.io').Server

import { prisma } from '@/utils/db'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat', async (msg) => {
    await prisma.testMsg
      .create({
        data: {
          msg,
        },
      })
      .then((res) => {
        console.log('saved', res)
      })
      .catch((err) => {
        console.log('error', err)
      })
    console.log('message: ' + msg)
    io.emit('chat', msg)
  })
})

server.listen(3001, () => {
  console.log('server running at http://localhost:3001')
})
