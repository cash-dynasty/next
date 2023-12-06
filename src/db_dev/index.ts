import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

const client = new Client({
  connectionString: process.env.DATABASE_URL_DEV,
})

client.connect()

export const dbDev = drizzle(client, { schema })
