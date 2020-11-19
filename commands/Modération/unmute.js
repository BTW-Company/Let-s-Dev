const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

module.exports.run = async (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find((r) => r.name === "muted");

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

  var currentID = await db.get("unmute.ID").value();

  if (!user.roles.cache.has(muteRole.id))
    return message.reply("L'utilisateur mentionné n'est pas mute");

  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> est unmute.`);

  const embed = new MessageEmbed()
    .setAuthor(`➔ Unmute`)
    .setColor("#dc143c")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Utilisateur**: ${user.user.tag} (${user.id})`
    )
    .setTimestamp()
    .setFooter(`Unmute #UM${currentID + 1}`, message.author.avatarURL());

  await bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);

  await db.set("unmute.ID", currentID + 1).write();
};

module.exports.config = {
  name: "unmute",
  aliases: [""],
  usage: "<@user>",
  description: "Unmute un utilisateur.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "mutePerm",
};
