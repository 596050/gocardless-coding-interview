const postgres = require("./initialise");

const text = ` SELECT server_id, last_check_in from health_check WHERE EXTRACT(MILLISECONDS FROM (NOW() - last_check_in)) > $1;`;

const fetchHeartbeatReport = async ({ heartbeat_timeout }) =>
  await postgres.client.query(text, [heartbeat_timeout]);

module.exports.fetchHeartbeatReport = fetchHeartbeatReport;
