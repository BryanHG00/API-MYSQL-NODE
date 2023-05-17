import { config } from "dotenv";

config()

export const PORT = process.env.PORT || 4001
export const HOST = process.env.DB_HOST
export const USER = process.env.USER
export const PASS = process.env.PASSWORD
export const DBNAME = process.env.DATA_BASE