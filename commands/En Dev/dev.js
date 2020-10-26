const Discord = require("discord.js");
const funct = require("../../utils/functions.js");

module.exports.run = async (bot, message, args) => {
  message.delete();

  message.channel.send("Hey, ca fonctionne !");
};

module.exports.config = {
  name: "dev",
  aliases: [""],
  usage: "",
  description: "Commande en dev.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: ["dev"],
  group: "En Dev - Commandes en developpement",
  onlyOwner: true,
  args: true,
};
