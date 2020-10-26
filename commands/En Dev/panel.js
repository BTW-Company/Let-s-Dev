const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/panel.json");
const db = low(adapter);

module.exports.run = async (bot, message, args) => {
  const emojiSupport = bot.emojis.cache.get(bot.config.EMOJI.SUPPORT_REACTION);

  switch (args[0]) {
    case "setup":
      const panelEmbedOne = new MessageEmbed()
        .setTitle("Panel - Modération")
        .setDescription(
          `● Pour passer en **Support En Service** \n ● Veuillez cliquez sur la réaction <:IconSupport:766012642883666013> 
        \n ● Et pour vous retirer, cliquez également sur la réaction
        `
        )
        .setFooter("Panel - Modération");

      await message.channel
        .send(panelEmbedOne)
        .then(
          async (m) =>
            (await m.react(emojiSupport)) &&
            db.set("panel.panelOneID", m.id).write()
        );

      break;

    default:
      console.log("Hey");
      break;
  }
};

module.exports.config = {
  name: "panel",
  aliases: [""],
  usage: "<setup>",
  description: "Commande en dev.",
  accessableby: "",
  permissions: ["Envoyer des messages", "Ajouter des réactions"],
  example: [""],
  group: "En Dev - Commandes en developpement",
  onlyOwner: true,
  args: true,
};
