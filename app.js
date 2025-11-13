import { Server } from 'socket.io'
import { Redis } from 'ioredis'
import { createAdapter } from '@socket.io/redis-streams-adapter'
import dotenv from 'dotenv'

dotenv.config()

// const client = new Redis({
//   host: 'redis',
//   port: 6379
// })

// client.on('connect', () => {
//   console.log('[db-redis] Successfully connected to Redis database')
// })

const io = new Server({
  // adapter: createAdapter(client)
})

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log('Message reçu :', data)
  })

  socket.on('whois', () => {
    console.log('on => whois', { hostname: process.env.HOSTNAME })
    socket.emit('whois', { hostname: process.env.HOSTNAME })
  })

  socket.on('broadcast', (data) => {
    console.log('on => broadcast', { hostname: process.env.HOSTNAME })
    socket.broadcast.emit('broadcast', data)
  })
})

io.listen(3000)