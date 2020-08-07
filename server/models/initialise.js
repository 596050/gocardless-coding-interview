const { Client } = require("pg");

// health-check-postgres
// docker run --name health-check-postgres -p 15432:5432 -v /Users/pricet/Documents/goCardless/server/postgresData:/var/lib/postgresql/data -e POSTGRES_PASSWORD=root -d postgres
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 15432,
});

const createQuery = `CREATE TABLE IF NOT EXISTS health_check (
    server_id varchar PRIMARY KEY,
    last_check_in timestamptz 
);`;

const executeQuery = (query) =>
  client
    .query(query)
    .then((res) => {
      console.log("Table is successfully created");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      // client.end();
    });

executeQuery(createQuery);

module.exports.client = client;
