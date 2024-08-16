import pg from "pg";

const Pool = pg.Pool;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASS,
  port: process.env.POSTGRES_PORT,
});

export default pool;
