const { Collection, Client } = require("discord.js");
const { loadCommands, loadEvents } = require("./utils/loader");
const colors = require("colors");

const funct = require("./utils/functions.js");

// Initialisation du client
const bot = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

// Assign to bot
bot.config = require("./utils/config");
bot.main = require("./utils/constants");

// Initialisation des collections
bot.commands = new Collection();
bot.aliases = new Collection();

// Lancement des commandes + evenements
loadCommands(bot);
loadEvents(bot);

// Evenement ready
bot.on("ready", () => {
  console.log(colors.rainbow(`${bot.user.username}`) + " est en ligne !");
});

setTimeout(async () => await funct.load(bot), 0);
