const fs = require("fs");

module.exports.loadServers = (path = "./db.json") => {
  fs.readFileSync(path, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    return JSON.parse(data);
  });
};

module.exports.saveServers = async (path = "./db.json", servers = []) => {
  try {
    await fs.promises.writeFile(path, JSON.stringify(servers), "utf-8");
  } catch (err) {
    console.error(err);
  }
};
