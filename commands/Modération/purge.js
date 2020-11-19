const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

module.exports.run = async (bot, message, args) => {
  if (isNaN(args[0]) || args[0] < 1 || args[0] > 100)
    return message.reply("Il faut spécifier un ***nombre*** entre 1 et 100.");

  var currentID = await db.get("purge.ID").value();

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
    .setAuthor(`➔ Purge`)
    .setColor("#dc143c")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Nbr de messages**: ${args[0]} \n **Salon**: ${message.channel}`
    )
    .setTimestamp()
    .setFooter(`Purge #PU${currentID + 1}`, message.author.avatarURL());

  await bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);

  await db.set("purge.ID", currentID + 1).write();
};

module.exports.config = {
  name: "purge",
  aliases: [""],
  usage: "<nbr_messages>",
  description: "Purge un nombre de message spécifié.",
  accessableby: "",
  permissions: ["Envoyer des messages", "Gérer les messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "messagePerm",
};
