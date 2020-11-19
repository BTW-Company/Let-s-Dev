const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

module.exports.run = async (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  if (isNaN(args[1]) || args[1] < 1 || args[1] > 100)
    return message.reply("Il faut spécifier un ***nombre*** entre 1 et 100.");

  var currentID = await db.get("prune.ID").value();

  const messages = (
    await message.channel.messages.fetch({
      limit: 100,
      before: message.id,
    })
  )
    .filter((a) => a.author.id === user.id)
    .array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user)
    return message.reply(
      "Aucun message à supprimer sur cet utilisteur __ou__ cet utilisateur n'existe pas"
    );

  if (messages.length === 1) await messages[0].delete;
  else await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
    .setAuthor(`➔ Prune`)
    .setColor("#dc143c")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Victime**: ${user.user.tag} (${user.id}) \n **Nbr de messages**: ${args[1]} `
    )
    .setFooter(`Prune #PR${currentID + 1}`, message.author.avatarURL());

  await bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);

  await db.set("prune.ID", currentID + 1).write();
};

module.exports.config = {
  name: "prune",
  aliases: [""],
  usage: "<@user> <nbr_messages>",
  description:
    "Purge un nombre de message spécifié sur un utilisateur spécifié.",
  accessableby: "",
  permissions: ["Envoyer des messages", "Gérer les messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "messagePerm",
};
