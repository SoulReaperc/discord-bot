module.exports.run = async (client, message, args) => {
    
    if (!args[0]) return;
      const sayMessage = args.slice(0).join(" ");
      await message.channel.send(sayMessage);
}


module.exports.names = {
  list: ["say"]
};