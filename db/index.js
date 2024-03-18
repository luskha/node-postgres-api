//import { Pool } from 'pg';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dc',
    password: 'postgres',
    port: 5432,
});

export default pool;