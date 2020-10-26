const { MessageEmbed } = require("discord.js");

const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let userID = user.id;
  let banTime = args[1] || "60s";
  let banReason = args[2] || "Aucune raison spécifié";

  await user.ban(user);
  message.channel.send(`<@${user.id}> est ban pour ${ms(ms(banTime))}.`);

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${userID})`)
    .setColor("#cc9ff0")
    .setDescription(
      `**Action**: Temp-Ban\n**Temps**: ${ms(
        ms(banTime)
      )}\n**Raison**: ${banReason}`
    )
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  if (user.user.avatar) {
    embed.setThumbnail(user.user.avatarURL());
  }

  bot.channels.cache.get("722559340933808148").send(embed);

  setTimeout(async function () {
    await message.guild.members.unban(userID);

    const embed = new MessageEmbed()
      .setAuthor(`${user.user.username} (${userID})`)
      .setColor("#cc9ff0")
      .setDescription(
        `**Action**: Temp-Ban\n**Temps**: Ecoulé
      )}\n**Raison**: ${banReason}`
      )
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());

    if (user.user.avatar) {
      embed.setThumbnail(user.user.avatarURL());
    }

    bot.channels.cache.get("722559340933808148").send(embed);
  }, ms(banTime));
};

module.exports.config = {
  name: "tempban",
  aliases: [""],
  usage: "<@user> <time>",
  description: "Ban un utilisateur temporairement.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
};
