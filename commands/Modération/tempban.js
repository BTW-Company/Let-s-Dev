const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let userID = user.id;
  let banTime = args[1] || "60s";
  let banReason = args[2] || "Aucune raison spécifié";

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

  var currentID = await db.get("temp-ban.ID").value();

  //await user.ban(user);
  message.channel.send(`<@${user.id}> est ban pour ${ms(ms(banTime))}.`);

  const embed = new MessageEmbed()
    .setAuthor(`➔ Temp-Ban`)
    .setColor("#dc143c")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Victime**: ${user.user.tag} (${
        user.id
      }) \n **Temps**: ${ms(ms(banTime))} \n **Raison**: ${banReason}`
    )
    .setTimestamp()
    .setFooter(`Temp-Ban #TB${currentID + 1}`, message.author.avatarURL());

  bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);

  setTimeout(async function () {
    await message.guild.members.unban(userID);

    const embed = new MessageEmbed()
      .setAuthor(`➔ Temp-Ban`)
      .setColor("#dc143c")
      .setDescription(
        `**Auteur**: ${message.author.tag} \n **Victime**: ${user.user.tag} (${user.id}) \n **Temps**: Ecoulé \n **Raison**: ${banReason}`
      )
      .setTimestamp()
      .setFooter(`Temp-Ban #TB${currentID + 1}`, message.author.avatarURL());

    bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);
  }, ms(banTime));

  await db.set("temp-ban.ID", currentID + 1).write();
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
  perm: "banPerm",
};
