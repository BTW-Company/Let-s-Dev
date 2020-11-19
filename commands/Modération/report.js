const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

const isFirstCharNumeric = (c) => /\d/.test(c);

module.exports.run = async (bot, message, args) => {
  const reportChannel = bot.channels.cache.get(bot.config.CHANNELS.REPORTS);
  const emojiReport = bot.emojis.cache.get(bot.config.EMOJI.REPORT_REACTION);

  var currentID = await db.get("report.ID").value();

  const user = message.mentions.users.first();

  if (!args[1]) {
    const noIDEmbed = new MessageEmbed()
      .setTitle("Une erreur est survenue")
      .setColor("#ff4141")
      .setDescription(
        `● Vous devez mettre l'ID du message \n ● \`${bot.config.PREFIX}report <@user> <id_du_message> <raison> \``
      )
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);

    return message.channel.send(noIDEmbed);
  }

  if (!args[2]) {
    const noReasonEmbed = new MessageEmbed()
      .setTitle("Une erreur est survenue")
      .setColor("#ff4141")
      .setDescription(
        `● Vous devez spécifier une raison \n ● \`${bot.config.PREFIX}report <@user> <id_du_message> <raison> \``
      )
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);

    return message.channel.send(noReasonEmbed);
  } else {
    var reason = args[1];
  }

  message.react(emojiReport);

  const embed = new MessageEmbed()
    .setAuthor(`➔ Report`)
    .setColor("#00b7c3")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Victime**: ${user.tag} (${
        user.id
      })  \n **Salon**: ${message.channel} \n **Lien du message** : ${
        isFirstCharNumeric(reason.charAt(0))
          ? `[Cliquez-moi](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[2]})`
          : "Aucun lien précisé"
      } \n **Raison** : ${
        isFirstCharNumeric(reason.charAt(0))
          ? args.slice(args.indexOf(args[2])).join(" ")
          : args.slice(args.indexOf(args[1])).join(" ")
      }`
    )
    .setTimestamp()
    .setFooter(`Report #RE${currentID + 1}`, message.author.avatarURL());

  if (user.avatar) {
    embed.setThumbnail(user.displayAvatarURL());
  }

  await reportChannel.send(embed);
  await db.set("report.ID", currentID + 1).write();
};

module.exports.config = {
  name: "report",
  aliases: [""],
  usage: "<@user> [id_du_message] <raison>",
  description: "Report un utilisateur.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "",
};
