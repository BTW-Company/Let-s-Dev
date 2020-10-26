const token = require("../json/token.json");

// Fonction load
module.exports.load = async (bot) => {
  // Lancement du bot
  await bot.login(token.token);
};
