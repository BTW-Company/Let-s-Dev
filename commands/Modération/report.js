const { MessageEmbed } = require("discord.js");

const isFirstCharNumeric = (c) => /\d/.test(c);

module.exports.run = async (bot, message, args) => {
  const reportChannel = bot.channels.cache.get("723479973863882752");

  const user = message.mentions.users.first();
  let reason = args[1];

  const embedNoReason = new MessageEmbed()
    .setTitle("Une erreur est survenue")
    .setColor("#b30000")
    .setDescription("Veuillez spécifier une raison.")
    .setTimestamp()
    .setFooter("Erreur", `${bot.user.avatarURL()}`);

  if (!args[1]) {
    return;
  } else {
    if (!reason) return message.channel.send(embedNoReason);
  }

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Reporté", value: user.username, inline: true },
      {
        name: "Lien du message",
        value: isFirstCharNumeric(reason.charAt(0))
          ? `[Click me](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})`
          : "Aucun lien précisé",
        inline: true,
      },
      {
        name: "Raison",
        value: isFirstCharNumeric(reason.charAt(0))
          ? args.slice(args.indexOf(args[2])).join(" ")
          : args.slice(args.indexOf(args[1])).join(" "),
        inline: false,
      }
    )
    .setTimestamp();

  if (user.avatar) {
    embed.setThumbnail(user.displayAvatarURL());
  }

  reportChannel.send(embed);

  const embedSuccess = new MessageEmbed()
    .setTitle("Succès")
    .setColor("#4a6c40")
    .setDescription(
      `Votre report sur l'utilisateur : ${user.tag} a été effectué avec succès.`
    )
    .setTimestamp()
    .setFooter("Succès", `${bot.user.avatarURL()}`);

  message.channel.send(embedSuccess);
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
};
