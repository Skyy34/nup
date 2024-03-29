const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const powitania = require("./powitania.js")
const client = new Client();
require("discord-buttons")(client);

const Loader = require("./utils/loader.util");
require("./utils/logger.util");

client.config = require("./config");
client.commands = new Collection();
client.aliases = new Collection();
client.loader = new Loader(client);

client.once('ready', () => {
  powitania(client);
})

readdirSync("./src/handlers").forEach(handler => {
  if (!handler.endsWith(".js")) return;
  console.log(`Załadowano ${handler}`);
  require(`./handlers/${handler}`)(client);
});

client.login(client.config.token);
