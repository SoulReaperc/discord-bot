module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let avatarUrl = user.displayAvatarURL({ dynamic: true, size: 512 });

    message.channel.send(avatarUrl);
}

module.exports.names = {
    list: ["avatar","av"]
};
