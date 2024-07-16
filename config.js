// config.js
import dotenv from 'dotenv'
dotenv.config()
export const config = {
  // storing all env data in here
  port: process.env.PORT,
  dbHost: process.env.DB_HOST || 'localhost',
}
