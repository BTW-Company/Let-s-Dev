const { MessageEmbed } = require("discord.js");
const funct = require("../../utils/functions.js");

module.exports.run = async (bot, message, args) => {
  var state = 0;

  const embedOne = new MessageEmbed().setDescription("Test NEW");
  const embedTwo = new MessageEmbed().setDescription("Hey partie 2");

  function reactArrow(msgID) {
    msgID.react("◀️").then(() => {
      msgID.react("⏹️").then(() => {
        msgID.react("▶️");
      });
    });
  }

  message.channel.send(embedOne).then((msg) => {
    reactArrow(msg);

    let filter = (reaction, user) =>
      reaction.emoji && user.id === message.author.id;

    const reactCollector = msg.createReactionCollector(filter, {
      max: 1,
      maxEmojis: 1,
      maxUsers: 1,
    });

    reactCollector.on("end", (reaction) => {
      const emoji = reaction.first()._emoji.name;

      if (emoji == "⏹️") {
        msg.delete();
      }
      if (emoji == "◀️") {
        msg.edit(embedTwo);
        state--;
      }
      if (emoji == "▶️") {
        msg.edit(embedTwo);
        state++;
      }
    });
  });
};

module.exports.config = {
  name: "collector-test",
  aliases: [""],
  usage: "",
  description: "Commande en dev.",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: ["dev"],
  group: "En Dev - Commandes en developpement",
  onlyOwner: true,
  args: false,
};
