import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  schema: './src/db_dev/schema.ts',
  driver: 'pg',
  out: './src/db_dev',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL_DEV || '',
  },
} satisfies Config
