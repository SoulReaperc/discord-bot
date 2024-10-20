const { Client } = require("discord.js-selfbot-v13");

module.exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.reply("Please provide a status message or 'null' to remove the status.");
    }

    const status = args.join(" ");
    
    if (status.toLowerCase() === 'null') {
        client.settings.setCustomStatus({ text: null });
        return message.reply("Custom status removed.");
    }

    client.settings.setCustomStatus({ text: status });
    message.reply(`Custom status set to: ${status}`);
};

module.exports.names = {
    list: ["customstatus"]
};
