const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

module.exports.run = async (bot, message, args) => {
  let user = await bot.users.fetch(args[0]);
  if (!user) return message.reply("L'utilisateur n'existe pas.");
  message.guild.members.unban(user);

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

  var currentID = await db.get("unban.ID").value();

  const embed = new MessageEmbed()
    .setAuthor(`➔ Unban`)
    .setColor("#dc143c")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Utilisateur**: ${user.user.tag} (${user.id})`
    )
    .setTimestamp()
    .setFooter(`Unban #UB${currentID + 1}`, message.author.avatarURL());

  await bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);

  await db.set("unban.ID", currentID + 1).write();
};

module.exports.config = {
  name: "unban",
  aliases: [""],
  usage: "<user_id>",
  description: "Unban un utilisateur.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "banPerm",
};
