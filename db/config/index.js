import 'dotenv/config.js'
//import { Pool } from 'pg';
import pg from 'pg';

//poderia fazer na linha 7 new pg.Pool e não ter a linha 5
const { Pool } = pg;

console.log('Enviroments', process.env);
export const config = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
});