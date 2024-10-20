const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (client, message, args) => {

    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    //const ping = Date.now() - message.createdTimestamp;
    return message.channel.send(`Ping is: ${Date.now() - message.createdTimestamp} ms\nUptime: ${duration}`);

};

module.exports.names = {
    list: ["pingg"]
};
