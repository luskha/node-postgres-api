//import { Pool } from 'pg';
import pg from 'pg';
import 'dotenv/config'


//poderia fazer na linha 7 new pg.Pool e não ter a linha 5
const { Pool } = pg;

/* const DB_NAME = process.env.DB_NAME || 'dc_22'; */
const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD || 'col@123';


//export const isDev = process.env.NODE_ENV === 'development';

//console.log(process.env.NODE_ENV, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER);

//if (!isDev) console.log('in production environment - skipping database creation.');

export const config = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    /* database: DB_NAME, */
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: false } // Opção para permitir conexões sem SSL
});