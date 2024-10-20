const prefix = global.config.prefix;
const config = require("../config");
const path = require("path");
const fs = require('fs');
const axios = require("axios");
//const { MessageEmbed } = require('discord.js');

const controlFilePath = path.resolve(__dirname, "../commands/control.json");
const afkFilePath = path.resolve(__dirname, '../afkData.json');
const allowedFilePath = path.resolve(__dirname, '../allowed.json');




// Ensure control.json exists
if (!fs.existsSync(controlFilePath)) {
    fs.writeFileSync(
        controlFilePath,
        JSON.stringify({ joinvc: false, guildId: "", channelId: "", frozen: false }, null, 2),
    );
}

function readControlSettings() {
    return JSON.parse(fs.readFileSync(controlFilePath));
}

// Function to read AFK data
function readAfkData() {
    try {
        return JSON.parse(fs.readFileSync(afkFilePath, 'utf8'));
    } catch (err) {
        console.error('Error reading AFK data:', err);
        return {};
    }
}

// Function to read allowed user IDs
function readAllowedIds() {
    try {
        const data = JSON.parse(fs.readFileSync(allowedFilePath, 'utf8'));
        return data.allowed || [];
    } catch (err) {
        console.error('Error reading allowed user IDs:', err);
        return [];
    }
}



module.exports = async (client, message) => {
    let control = readControlSettings();
    let afkData = readAfkData();
    const allowedIds = readAllowedIds();


    const afkperson = (Object.keys(afkData)[0]);

    if (message.author.id === afkperson) {
        if (message.content.startsWith("umm ")) return;
        if (message.content.startsWith("You are now AFK.")) return;

        const timestamp = afkData["966395185418367107"].timestamp;

        // Calculate the AFK duration
        const afkTimeSeconds = Math.floor(Date.now() / 1000) - timestamp - 10;
        const years = Math.floor(afkTimeSeconds / (3600 * 24 * 365));
        const months = Math.floor((afkTimeSeconds % (3600 * 24 * 365)) / (3600 * 24 * 30));
        const days = Math.floor((afkTimeSeconds % (3600 * 24 * 30)) / (3600 * 24));
        const hours = Math.floor((afkTimeSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((afkTimeSeconds % 3600) / 60);
        const seconds = afkTimeSeconds % 60;

        let afkDuration = "";
        if (years > 0) afkDuration += `${years} years `;
        if (months > 0) afkDuration += `${months} months `;
        if (days > 0) afkDuration += `${days} days `;
        if (hours > 0) afkDuration += `${hours} hours `;
        if (minutes > 0) afkDuration += `${minutes} minutes `;
        if (seconds > 0) afkDuration += `${seconds} seconds`;

        // Remove the user from the AFK data
        delete afkData[message.author.id];
        try {
            fs.writeFileSync(afkFilePath, JSON.stringify(afkData, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing AFK data:', err);
        }

        // Send a message notifying that the user's AFK status has been removed
        if (message.channel.type === 'dm') {
            message.author.send(`Your AFK status has been removed.`);
        } else {
            message.channel.send(`${message.author.username}'s AFK status has been removed after ${afkDuration}.`);
        }
    }

    if ((message.mentions.users.first() === client.user || message.reference) && !message.author.bot) {
        if (afkData[message.author.id]) {
            const { reason } = afkData[message.author.id];
            if (message.channel.type === 'dm') {
                message.author.send(`You are now AFK. Reason: ${reason}`);
            } else {
                message.channel.send(`${message.author.username} is now AFK. Reason: ${reason}`);
            }
        }
    }

    const mentionedUserID = message.mentions.users.first()?.id;

    if (mentionedUserID && afkData[mentionedUserID]) {
        const { reason } = afkData[mentionedUserID];
        const timestamp = afkData["966395185418367107"].timestamp;

        message.channel.send(`umm <@${message.author.id}> I am afk right now. \nI was last online <t:${timestamp}:R>\nReason :- ${reason}`);
    }
       


    if (message.content.indexOf(prefix) === 0) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        if (message.author.id !== "964871291167461426" && control.frozen) {
            return; 
        }
        if (!allowedIds.includes(message.author.id) && allowedIds.length > 0) {
            return;
        }
        cmd.run(client, message, args);
    }


};

