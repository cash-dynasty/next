import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  schema: './src/db/schema_dev.ts',
  driver: 'pg',
  out: './db_dev',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL_DEV || '',
  },
} satisfies Config
