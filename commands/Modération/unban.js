const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let user = await bot.users.fetch(args[0]);
  if (!user) return message.reply("L'utilisateur n'existe pas.");
  message.guild.members.unban(user);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("##dc143c")
    .setDescription(`**Action**: Unban`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  if (user.avatar) {
    embed.setThumbnail(user.user.avatarURL());
  }

  bot.channels.cache.get("722559340933808148").send(embed);
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
};
