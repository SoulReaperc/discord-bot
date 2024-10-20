const fs = require("fs");
const path = require("path");

// Path to allowed.json
const allowedFilePath = path.resolve(__dirname, "../allowed.json");

// Check if allowed.json exists, if not create it with an empty allowed array
if (!fs.existsSync(allowedFilePath)) {
  fs.writeFileSync(allowedFilePath, JSON.stringify({ allowed: [] }));
}

module.exports.run = async (client, message, args) => {
  // Function to read allowed user IDs
  function readAllowedUsers() {
    try {
      const data = fs.readFileSync(allowedFilePath);
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData.allowed)) {
        return parsedData.allowed;
      } else {
        // If not an array, reset to an empty array
        return [];
      }
    } catch (error) {
      console.error("Error reading allowed.json:", error);
      return [];
    }
  }

  // Function to write allowed user IDs
  function writeAllowedUsers(users) {
    if (!Array.isArray(users)) {
      users = [];
    }
    try {
      const data = { allowed: users };
      fs.writeFileSync(allowedFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing to allowed.json:", error);
    }
  }

  // Check if the author is the owner
  if (message.author.id !== "964871291167461426") {
    return;
  }

  // Subcommands: add, remove, list
  if (args[0] === "add") {
    const userId = args[1];
    if (!userId) {
      return message.channel.send("Please provide a user ID to add.");
    }

    let allowedUsers = readAllowedUsers();
    if (allowedUsers.includes(userId)) {
      return message.channel.send("User ID is already allowed.");
    }

    allowedUsers.push(userId);
    writeAllowedUsers(allowedUsers);
    return message.channel.send(`User ID ${userId} has been added to the allowed list.`);
  }

  if (args[0] === "remove") {
    const userId = args[1];
    if (!userId) {
      return message.channel.send("Please provide a user ID to remove.");
    }

    let allowedUsers = readAllowedUsers();
    if (!allowedUsers.includes(userId)) {
      return message.channel.send("User ID is not in the allowed list.");
    }

    allowedUsers = allowedUsers.filter((id) => id !== userId);
    writeAllowedUsers(allowedUsers);
    return message.channel.send(`User ID ${userId} has been removed from the allowed list.`);
  }

  if (args[0] === "list") {
    const allowedUsers = readAllowedUsers();
    if (allowedUsers.length === 0) {
      return message.channel.send("No user IDs are currently allowed.");
    }
    return message.channel.send(`Allowed User IDs:\n${allowedUsers.join("\n")}`);
  }

  // If no valid subcommand is provided
  //return message.channel.send("Please provide a valid subcommand: add, remove, list.");
};

module.exports.names = {
  list: ["control"]
};
