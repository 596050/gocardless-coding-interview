const { Client } = require("pg");
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "root",
  port: 15432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const createQuery = `CREATE TABLE IF NOT EXISTS health_check (
    server_id varchar PRIMARY KEY,
    last_check_in timestamptz 
);`;

pool
  .query(createQuery)
  .then((res) => res)
  .catch((err) =>
    setImmediate(() => {
      throw err;
    })
  );

module.exports.pool = pool;

// health-check-postgres
// docker run --name health-check-postgres -p 15432:5432 -v /Users/pricet/Documents/goCardless/server/postgresData:/var/lib/postgresql/data -e POSTGRES_PASSWORD=root -d postgres
// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "root",
//   port: 15432,
// });

// const executeQuery = (query) =>
//   client
//     .query(query)
//     .then((res) => {
//       console.log("Table is successfully created");
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       // client.end();
//     });

// executeQuery(createQuery);
