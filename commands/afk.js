const fs = require('fs');

let afkData = {};

try {
    afkData = JSON.parse(fs.readFileSync('afkData.json', 'utf8'));
} catch (err) {
    console.error('Error reading AFK data:', err);
}
module.exports.run = async (client, message, args) => {

    const specificUserId = "966395185418367107";
    const reason = args.join(" ") || "I am AFK";
        const timestamp = (parseInt((message.createdTimestamp - 100) / 1000));
        

        // Add the user's AFK data with the desired structure including timestamp
        //afkData[message.author.id] = { userid: message.author.id, reason: reason, timestamp: timestamp };
        afkData[specificUserId] = { userid: specificUserId, reason: reason, timestamp: timestamp };


        try {
            // Write the updated AFK data to the file
            fs.writeFileSync('afkData.json', JSON.stringify(afkData, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing AFK data:', err);
        }

        // Send a message based on the context
        if (message.channel.type === 'dm') {
            message.author.send(`You are now AFK. Reason: ${reason}`);
        } else {
            message.channel.send(`You are now AFK. Reason: ${reason}`);
        }
}


module.exports.names = {
    list: ["afk"]
};