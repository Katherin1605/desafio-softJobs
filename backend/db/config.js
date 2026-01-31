import pg from 'pg';
import 'dotenv/config';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = new pg.Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  allowExitOnIdle: true,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error al conectar la DB', err);
  } else {
    console.log('✅ DB conectada:', res.rows);
  }
});

export default pool;