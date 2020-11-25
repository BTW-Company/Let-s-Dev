const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const tcpp = require("tcp-ping");

module.exports.run = async (bot, message, args) => {
  const srv = await fetch(
    "https://api.mcsrvstat.us/2/play.lets-dev.fr"
  ).then((res) => res.json());

  console.log(srv);

  if (srv.online == true) {
    var stateServer = "En Ligne";
  } else {
    var stateServer = "Éteint";
  }

  await tcpp.ping(
    { address: "95.111.229.136", port: "25565" },
    function (err, data) {
      const pingServer = Math.round(data.avg);

      const embed = new MessageEmbed()
        .setColor("#FEFEFE")
        .setDescription(`Voici les informations pour l'utilisateur **a**`)
        .addField("IP", `${srv.hostname}`, true)
        .addField("Joueurs", `${srv.players.online}/${srv.players.max}`, true)
        .addField("État du serveur", `${stateServer}`, true)
        .addField("Ping", `${pingServer}ms`, true)
        .setTimestamp()
        .setFooter(`a`);

      message.channel.send(embed);
    }
  );
};

module.exports.config = {
  name: "mc",
  aliases: [""],
  usage: "",
  description: "MC",
  accessableby: "",
  permissions: ["Envoyer des messages"],
  example: [""],
  group: "Minecraft - Commandes concernant le serveur minecraft",
  onlyOwner: false,
  args: false,
  perm: "",
};
