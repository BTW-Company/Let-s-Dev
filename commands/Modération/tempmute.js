const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find((r) => r.name === "muted");
  let muteTime = args[1] || "60s";

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

  var currentID = await db.get("temp-mute.ID").value();

  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: "muted",
        color: "#000",
        permissions: [],
      },
    });

    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false,
      });
    });
  }

  await user.roles.add(muteRole.id);
  message.channel.send(`<@${user.id}> est mute pour ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));

  const embed = new MessageEmbed()
    .setAuthor(`➔ Temp-Mute`)
    .setColor("#dc143c")
    .setDescription(
      `**Auteur**: ${message.author.tag} \n **Victime**: ${user.user.tag} (${
        user.id
      }) \n **Temps**: ${ms(ms(muteTime))}`
    )
    .setTimestamp()
    .setFooter(`Temp-Mute #TM${currentID + 1}`, message.author.avatarURL());

  await bot.channels.cache.get(bot.config.CHANNELS.MODLOG).send(embed);
  await db.set("temp-mute.ID", currentID + 1).write();
};

module.exports.config = {
  name: "tempmute",
  aliases: [""],
  usage: "<@user> <time>",
  description: "Mute un utilisateur temporairement.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Modération - Commandes de modération",
  onlyOwner: false,
  args: true,
  perm: "mutePerm",
};
