const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { loadServers, saveServers } = require("./services/config");
// const postgresql = require("./models/initialise");
const { insertIntoHealthCheck } = require("./models/create");
const { fetchHeartbeatReport } = require("./models/get");

const dbJsonFileName = process.env.DB_JSON;
const heartbeatTimeout = process.env.HEARTBEAT_TIMEOUT || 60000;

// postgresql.client.connect();
const servers = loadServers(dbJsonFileName);

const app = express();

// logging middleware
app.use(morgan("dev"));
app.use(cors());

app.get("/checkin/:serverId?", async (req, res) => {
  insertIntoHealthCheck({
    server_id: req.params.serverId || req.connection.remoteAddress,
    last_check_in: new Date(),
  });

  // // query database
  // // then time diff in the query
  // // if sql, do WHERE clause comparing timestamps
  // // Mongo, Redis using timestamp comparison specific apis
  // const serverIndex = servers.findIndex(
  //   (server) =>
  //     server.serverId === req.params.serverId ||
  //     server.serverId === req.connection.remoteAddress
  // );

  // if (serverIndex < 0) {
  //   servers.push({
  //     id: Math.max(...servers.map((s) => s.id), 0) + 1,
  //     serverId: req.params.serverId || req.connection.remoteAddress,
  //     lastCheckIn: new Date(),
  //   });
  // } else {
  //   servers[serverIndex].lastCheckIn = new Date();
  // }

  // await saveServers(servers, dbJsonFileName);

  res.sendStatus(200);
});

app.get("/heartbeat-report", async (req, res) => {
  const data = await fetchHeartbeatReport({
    heartbeat_timeout: heartbeatTimeout,
  });
  res.json(data.rows);

  // const currentDate = new Date();
  // res.json(
  //   servers.filter((server) => {
  //     return currentDate - server.lastCheckIn > heartbeatTimeout;
  //   })
  // );
});

const port = process.env.PORT || 8080;
const origin = process.env.ORIGIN || "http://localhost:";
app.listen(port, () => console.log(`Listening on port ${origin}${port}`));

// Scenario creating RESTful service to post heartbeats for server monitoring and provide
// RESTFul interface for getting the data.

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB connected"))
//   .catch((err) => {
//     console.error(`DB connected error ${err}`);
//   });

// mongoose.connection.on("error", (err) =>
//   console.error(`DB connection error ${err}`)
// );
