module.exports.run = async (client, message, args) => {

    const deleteCount = parseInt(args[0], 10);

      if (isNaN(deleteCount) || deleteCount < 1 || deleteCount > 100) {
        const statusMessage = await message.channel.send(
          "Chat tell me how many numbers are there between 1 to 100 ??",
        );
        setTimeout(async () => {
          try {
            await statusMessage.delete();
          } catch (error) {
            console.error("Failed to delete message:", error);
          }
        }, 5000);
        return;
      }

      try {

        const fetchedMessages = await message.channel.messages.fetch({
          limit: deleteCount,
        });

        
        const messagesToDelete = fetchedMessages.filter(
          (msg) => msg.author.id === "",//user id goes in there
        );

        for (const [key, msg] of messagesToDelete) {
          await msg.delete();
          await new Promise((resolve) => setTimeout(resolve, 500)); // Wait .5 seconds between deletions to avoid rate limits
        }

        const statusMessage = await message.channel.send(
          `there are ${messagesToDelete.size} numbers :/`,
        );
        setTimeout(async () => {
          try {
            await statusMessage.delete();
          } catch (error) {
            console.error("Failed to delete message:", error);
          }
        }, 5000);
      } catch (error) {
        console.error("Failed to purge messages:", error);
        const statusMessage = await message.channel.send(
          "There was an error trying to purge messages in this channel.",
        );
        setTimeout(async () => {
          try {
            await statusMessage.delete();
          } catch (error) {
            console.error("Failed to delete message:", error);
          }
        }, 5000);
      }
}


module.exports.names = {
    list: ["purge"]
};