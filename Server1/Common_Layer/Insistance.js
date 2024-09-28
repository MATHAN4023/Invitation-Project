const { Pool } = require('pg');

// const Auth = new Pool({
//     user: "postgres" || process.env.DB_USER,
//     host: "localhost" || process.env.DB_HOST,
//     database: "Authentication" || process.env.DB_NAME,
//     password: "123" || process.env.DB_PASSWORD,
//     port: 5432 || process.env.DB_PORT,
// });
const Product = new Pool({
    user: "postgres" || process.env.DB_USER,
    host: "localhost" || process.env.DB_HOST,
    database: "CarWash" || process.env.DB_NAME,
    password: "123" || process.env.DB_PASSWORD,
    port: 5432 || process.env.DB_PORT,
});

// const result = await pool.query('SELECT * FROM users');
// res.json(result.rows);
module.exports = {Product}