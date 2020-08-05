const axios = require("axios");

// 1. implement an API that captures the heartbeat of some legacy systems and 
// 2. implement another API that reports those that has not sent a heartbeat for more than N seconds

// configured list of servers
// register a server with you

module.exports.checkHeartBeat = async ({ url, timeout:  }) => {
  try {
    const res = await axios.get(url);
  } catch (err) {
    return false;
  }
};

module.exports.report