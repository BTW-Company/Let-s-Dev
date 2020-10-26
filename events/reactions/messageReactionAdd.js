module.exports = async (bot, messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji;

  // DB
  const low = require("lowdb");
  const FileSync = require("lowdb/adapters/FileSync");
  const adapter = new FileSync("./db/panel.json");
  const db = low(adapter);

  const supportRole = message.guild.roles.cache.get(
    bot.config.ROLE.SUPPORT_ROLE
  );

  const panelOneID = db.get("panel.panelOneID").value();

  if (member.user.bot) return;

  if (messageReaction.partial) {
    await messageReaction.fetch();
    return;
  }

  if (messageReaction.message.id === panelOneID) {
    if (emoji.id === bot.config.EMOJI.SUPPORT_REACTION)
      member.roles.add(supportRole);
  } else {
    return;
  }
};
