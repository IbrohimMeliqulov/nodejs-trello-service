import pg from "pg";
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD
})


pool.connect()
    .then(() => console.log("Database ulandingiz"))
    .catch(() => console.log("Databasega ulanish bilan muammo"))

export default pool