import pool from '../config/db.js';

export const fetchUsers = async () => {
   const result = await pool.query('SELECT * FROM users');
   return result.rows;
   // const users = [
   //    { "id": 1, "name": "Sudil" },
   //    { "id": 2, "name": "Raj" }
   // ]

   // return users;
};

export const addUser = async (name, email) => {
   const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
   );
   return result.rows[0];
};


export const editUser = async (values) => {
   const query = `
   UPDATE users 
   SET name = $1, email = $2, role = $3
   WHERE id = $4
   RETURNING *;
`;
   const { rowCount, rows } = await pool.query(query, values);

   return { rowCount, rows };
};


