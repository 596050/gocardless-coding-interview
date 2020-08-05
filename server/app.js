const express = require("express");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { loadServers, saveServers } = require("./services/config");

const servers = loadServers();
const heartbeatTimeout = 60000;

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

const app = express();

// logging middleware
// app.use(morgan("dev"));

app.get("/checkin", async (req, res) => {
  console.log("req.hostname", req.hostname, servers);
  const serverIndex = servers.findIndex(
    (server) => server.hostname === req.hostname
  );

  if (serverIndex < 0) {
    servers.push({
      id: Math.max(...servers.map((s) => s.id), 0) + 1,
      hostname: req.hostname,
      lastCheckIn: new Date(),
    });
  } else {
    servers[serverIndex].lastCheckIn = new Date();
  }

  await saveServers(servers);

  res.sendStatus(200);
});

app.get("/heartbeat-report", (req, res) => {
  const currentDate = new Date();

  res.json(
    servers.filter((server) => {
      return currentDate - server.lastCheckIn > heartbeatTimeout;
    })
  );
});

const port = process.env.PORT || 8080;
const origin = process.env.ORIGIN || "http://localhost:";
app.listen(port, () => console.log(`Listening on port ${origin}${port}`));

// Scenario creating RESTful service to post heartbeats for server monitoring and provide
// RESTFul interface for getting the data.
