const fs = require("fs");

module.exports.loadServers = (path = "./db.json") => {
  console.log(path);
  const data = fs.readFileSync(path, "utf-8");

  serversConfig = JSON.parse(data);

  console.log("data", data);

  return serversConfig.map((server) => ({
    id: server.id,
    serverId: server.serverId,
    lastCheckIn: new Date(server.lastCheckIn),
  }));
};

module.exports.saveServers = async (servers = [], path = "./db.json") => {
  try {
    await fs.promises.writeFile(path, JSON.stringify(servers), "utf-8");
  } catch (err) {
    console.error(err);
  }
};
