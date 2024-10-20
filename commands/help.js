module.exports.run = async (client, message) => {

    const commands = Array.from(message.client.commands.values());

    let reply = '```';
    reply += 'Here are the available commands:\n\n';

    const seenCommands = new Set();

    commands.forEach(command => {
        const primaryName = command.names.list[0];
        if (!seenCommands.has(primaryName)) {
            reply += `.${primaryName}`;
            if (command.names.list.length > 1) {
                const aliases = command.names.list.slice(1).join(', ');
                reply += ` (Aliases: ${aliases})`;
            }
            reply += `\n`;
            seenCommands.add(primaryName);
        }
    });

    reply += '```';

    message.channel.send(reply);
};

module.exports.names = {
    list: ["help", "h"]
};
