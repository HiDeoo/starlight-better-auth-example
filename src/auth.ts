import { betterAuth } from 'better-auth'
import Database from 'better-sqlite3'

export const auth = betterAuth({
  baseURL: import.meta.env.BETTER_AUTH_URL,
  database: new Database('./auth.db'),
  emailAndPassword: {
    enabled: true,
  },
})
