import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  schema: './src/db/schema.ts',
  driver: 'pg',
  out: './src/db/introspects',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
} satisfies Config
