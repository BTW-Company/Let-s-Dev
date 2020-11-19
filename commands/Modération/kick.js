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
    ? await message.guild.member(user) //.kick(reason)
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

  var currentID = await db.get("kick.ID").value();

  const embed = new MessageEmbed()
    .setAuthor(`➔ Kick`)
    .setColor("#ffa500")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Victime**: ${user.user.tag} (${user.id}) \n **Raison**: ${reason} `
    )
    .setTimestamp()
    .setFooter(`Kick #KI${currentID + 1}`, message.author.avatarURL());

  if (user.avatar) {
    embed.setThumbnail(user.user.avatarURL());
  }

  await bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);

  await db.set("kick.ID", currentID + 1).write();
};

module.exports.config = {
  name: "kick",
  aliases: [""],
  usage: "<@user> [reason]",
  description: "Kick un utilisateur.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "kickPerm",
};
