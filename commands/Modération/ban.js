const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

module.exports.run = async (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = args.splice(1).join(" ") || "Aucune raison spécifié";
  user
    ? await message.guild.member(user) //.ban(reason)
    : message.channel.send("L'utilisateur n'existe pas.");

  // Vérification hiérarchique
  if (
    !(message.member.roles.highest.comparePositionTo(user.roles.highest) > 0)
  ) {
    const embed = new MessageEmbed()
      .setTitle("Accès interdit")
      .setDescription(
        `● Vous ne pouvez pas utiliser cette commande sur quelqu'un de plus haut gradé que vous`
      )
      .setColor("#ff4141")
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);

    return message.channel.send(embed);
  }

  var currentID = await db.get("ban.ID").value();

  const embed = new MessageEmbed()
    .setAuthor(`➔ Ban`)
    .setColor("#dc143c")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Victime**: ${user.user.tag} (${user.id}) \n **Raison**: ${reason} `
    )
    .setTimestamp()
    .setFooter(`Ban #BA${currentID + 1}`, message.author.avatarURL());

  if (user.avatar) {
    embed.setThumbnail(user.user.avatarURL());
  }

  await bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);

  await db.set("ban.ID", currentID + 1).write();
};

module.exports.config = {
  name: "ban",
  aliases: [""],
  usage: "<@user> [reason]",
  description: "Ban un utilisateur.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "banPerm",
};

/*
{
  name: "ban",
  aliases: ["ban"],
  category: "moderation",
  description: "Ban un utilisateur",
  cooldown: 10,
  usage: "<@user> [reason]",
  isUserAdmin: true,
  permissions: true,
  args: true,
},
*/
