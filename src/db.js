import { createPool } from "mysql2/promise";

import { HOST, USER, PASS,DBNAME } from "./config.js";

export const pool = createPool({
    host: HOST,
    user:USER,
    password:PASS,
    port: 3306,
    database: DBNAME
})