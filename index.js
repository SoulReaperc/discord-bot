
const {
  Client,
  MessageAttachment,
  Permissions,
} = require("discord.js-selfbot-v13");
//const { joinVoiceChannel } = require("@discordjs/voice");
const fs = require("fs");
const path = require("path");
// Path to control.json
/*const controlFilePath = path.resolve(__dirname, "control.json");

// Check if control.json exists, if not create it with default values
if (!fs.existsSync(controlFilePath)) {
  fs.writeFileSync(
    controlFilePath,
    JSON.stringify(
      { joinvc: false, guildId: "", channelId: "", frozen: false },
      null,
      2,
    ),
  );
}

// Function to read control settings
function readControlSettings() {
  return JSON.parse(fs.readFileSync(controlFilePath));
}

// Function to write control settings
function writeControlSettings(settings) {
  fs.writeFileSync(controlFilePath, JSON.stringify(settings, null, 2));
}

// Read initial control settings
let control = readControlSettings();
let spamming = false;*/
const client = new Client({ checkUpdate: false });
//const { Player } = require("discord-player")
//const fs = require('fs');
//const Enmap = require('enmap');
//const utils = require('./utils');
const config = require("./config")
global.config = {'token': config.token, 'prefix': config.prefix};
global.config.allowed=require("./allowed.json").allowed

client.login(config.token)

console.log("Logging in...");


global.queue = new Map();
client.commands = new Map();


var loaded = {events: [], commands: []};

var promise = new Promise((resolve) => {
  fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const evt = require(`./events/${file}`);
      let evtName = file.split('.')[0];
      loaded.events.push(evtName)
      client.on(evtName, evt.bind(null, client));
    });
    resolve();
  });
});


fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    props.names.list.forEach(name => {
      client.commands.set(name, props);
    })
    let cmdName = file.split('.')[0];
    loaded.commands.push(cmdName)
  });
  promise.then(() => {console.log(`Table of commands and events :`)});
});




//let activities = [];

client.once('ready', async () => {
    console.log(`${client.user.username} is ready!`);

    // Schedule activity change every 10 seconds
  /*  setInterval(() => {
        try {
            // Read the status_rotator.json file
            const data = fs.readFileSync('status_rotator.json', 'utf8');
            const jsonData = JSON.parse(data);
            activities = jsonData.lines;

            // Set bot's activity
            //client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`);
            client.settings.setCustomStatus({ text: `${activities[Math.floor(Math.random() * activities.length)]}` });
        } catch (err) {
            console.error('Error reading status data:', err);
        }
    }, 60000); // Check for updates every 10 seconds*/
});

// function leave(guild) {
//     guild.me.voice.connection.disconnect();
// }

// client.on('voiceStateUpdate', (oldState, newState) => {
//     const state = oldState || newState;
//     if (state.member.user.bot) return;

//     const guild = state.guild;
//     if (!guild.me.voice.connection) return;
//     if (newState.channel === oldState.channel) return;

//     leave(guild)
// });