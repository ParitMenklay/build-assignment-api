// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:dragon35460@localhost:5432/build-creating-data-api",
});

export default connectionPool;
