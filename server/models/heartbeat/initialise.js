const postgres = require("../database");

const createQuery = `CREATE TABLE IF NOT EXISTS health_check (
    server_id varchar PRIMARY KEY,
    last_check_in timestamptz 
);`;

postgres.pool
  .query(createQuery)
  .then((res) => res)
  .catch((err) =>
    setImmediate(() => {
      throw err;
    })
  );
