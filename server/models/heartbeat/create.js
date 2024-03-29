const postgres = require("../database");

const text =
  "INSERT INTO health_check(server_id, last_check_in) VALUES($1, $2) ON CONFLICT (server_id) DO UPDATE SET last_check_in = excluded.last_check_in RETURNING *;";

insertIntoHealthCheck = ({ server_id, last_check_in }) =>
  postgres.pool.connect().then((client) => {
    return client
      .query(text, [server_id, last_check_in])
      .then((res) => {
        client.release();
        return res;
      })
      .catch((err) => {
        client.release();
        console.log(err.stack);
      });
  });

module.exports.insertIntoHealthCheck = insertIntoHealthCheck;

// const insertIntoHealthCheck = ({ server_id, last_check_in }) =>
//   postgres.client.query(text, [server_id, last_check_in], (err, res) => {
//     if (err) {
//       console.log(err.stack);
//     }
//   });
