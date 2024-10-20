module.exports.run = async (client, message, args) => {

    if (!['dnd', 'online', 'idle', 'invisible'].includes(args[0])) {
        return message.reply("Invalid status. Please enter one of the following statuses: 'dnd', 'online', 'idle', 'invisible'.");
    }
    

    // Set the bot's status
    client.user.setStatus(args[0])
            message.channel.send(`Going ${args[0]}.`);
}


module.exports.names = {
    list: ["status"]
};