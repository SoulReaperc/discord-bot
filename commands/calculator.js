module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send("what to calculate??")
        let resp;

    try {
        resp = math.evaluate(args.join(" "))
    } catch (e) {
        message.channel.send("Invalid math equation");
      }
      message.channel.send(`**Equation**\n> \`\`\`${args.join()}\`\`\`\n**Result**\n> \`\`\`${resp}\`\`\``)
}


module.exports.names = {
    list: ["calculator", "cal"]
};