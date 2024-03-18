import db from '../db/index.js';

const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

export { getUserById };
