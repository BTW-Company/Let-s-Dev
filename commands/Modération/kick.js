const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = args.splice(1).join(" ") || "Aucune raison spécifié";
  user
    ? message.guild.member(user).kick(reason)
    : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: Kick\n**Raison**: ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  if (user.avatar) {
    embed.setThumbnail(user.user.avatarURL());
  }

  bot.channels.cache.get("722559340933808148").send(embed);
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
};
