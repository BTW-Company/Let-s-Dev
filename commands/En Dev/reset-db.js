const { MessageEmbed } = require("discord.js");

// DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/sanctions.json");
const db = low(adapter);

module.exports.run = async (bot, message, args) => {
  await db.set("mute.ID", 0).write();
  await db.set("ban.ID", 0).write();
  await db.set("kick.ID", 0).write();
  await db.set("prune.ID", 0).write();
  await db.set("purge.ID", 0).write();
  await db.set("report.ID", 0).write();
  await db.set("temp-ban.ID", 0).write();
  await db.set("temp-mute.ID", 0).write();
  await db.set("unban.ID", 0).write();
  await db.set("unmute.ID", 0).write();

  const embed = new MessageEmbed()
    .setAuthor(`➔ Reset DB`)
    .setColor("#dc143c")
    .setDescription(`La DB a été réinitialisée avec succès !`)
    .setTimestamp()
    .setFooter(`Reset DB`, message.author.avatarURL());

  message.author.send(embed);
};

module.exports.config = {
  name: "reset-db",
  aliases: [""],
  usage: "",
  description: "Reset la DB.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "En Dev - Commandes en developpement",
  onlyOwner: true,
  args: false,
  perm: "",
};
