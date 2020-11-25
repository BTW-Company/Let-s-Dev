const { MessageEmbed, Collection } = require("discord.js");

module.exports = async (bot, message) => {
  // Evenement message
  const gTarget = message.guild;

  const appGet = await bot.fetchApplication();
  const ownerID = appGet.owner.members.has(message.author.id);

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = bot.config.PREFIX;

  // Demande de prefix
  if (message.content === "<@!765285407428182036>") {
    message.delete();

    const rEmbed = new MessageEmbed()
      .setColor("#2D7D9A")
      .setTitle("Prefix")
      .addField("Le prefix sur ce serveur est", `\➔ \`${prefix}\``)
      .setTimestamp()
      .setFooter(`${gTarget}`);

    if (gTarget.icon) {
      rEmbed.setFooter(`${gTarget}`, `${gTarget.iconURL()}`);
    }

    message.channel.send(rEmbed);
  }

  // Vérification invitation Discord
  if (ownerID == false) {
    let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
    if (discordInvite.test(message.content)) {
      await message.delete();
      const embed = new MessageEmbed()
        .setTitle("Action interdite")
        .setDescription(
          `● Vous n'êtes pas autorisé à envoyer une invitation \n ● Si vous pensez que c'est une erreur \n ● Veuillez nous contacter en passant par les Tickets`
        )
        .setColor("#ff4141")
        .setTimestamp()
        .setFooter("Erreur", `${bot.user.avatarURL()}`);

      message.author.send(embed);
    }
  }

  // Vérification prefix
  if (!message.content.startsWith(prefix)) return;

  // Constantes
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.config.aliases && cmd.config.aliases.includes(commandName)
    );
  if (!command) return;

  // Vérification owner
  const ownerListID = ["279351779693428736", "350710888812249101"];
  if (
    command.config.onlyOwner == true &&
    !ownerListID.includes(message.author.id)
  ) {
    const embed = new MessageEmbed()
      .setTitle("Accès interdit")
      .setDescription(
        `● Seul les membres autorisés peuvent effectuer cette commande`
      )
      .setColor("#ff4141")
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);

    return message.channel.send(embed);
  }

  // Vérification des permissions
  const noPermEmbed = new MessageEmbed()
    .setTitle("Accès interdit")
    .setDescription(
      `● Seul les membres autorisés peuvent effectuer cette commande`
    )
    .setColor("#ff4141")
    .setTimestamp()
    .setFooter("Erreur", `${bot.user.avatarURL()}`);

  switch (command.config.perm) {
    case "banPerm":
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        noPermEmbed.setDescription(
          `● Seul les membres autorisés peuvent effectuer cette commande \n ● Vous devez posseder la permission \`BAN_MEMBERS\``
        );
        return message.channel.send(noPermEmbed);
      }

    case "kickPerm":
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        noPermEmbed.setDescription(
          `● Seul les membres autorisés peuvent effectuer cette commande \n ● Vous devez posseder la permission \`KICK_MEMBERS\``
        );
        return message.channel.send(noPermEmbed);
      }

    case "mutePerm":
      if (!message.member.hasPermission("MUTE_MEMBERS")) {
        noPermEmbed.setDescription(
          `● Seul les membres autorisés peuvent effectuer cette commande \n ● Vous devez posseder la permission \`MUTE_MEMBERS\``
        );
        return message.channel.send(noPermEmbed);
      }

    case "messagePerm":
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        noPermEmbed.setDescription(
          `● Seul les membres autorisés peuvent effectuer cette commande \n ● Vous devez posseder la permission \`MANAGE_MESSAGES\``
        );
        return message.channel.send(noPermEmbed);
      }
    default:
  }

  // Vérification des arguments
  if (command.config.args && !args.length) {
    const noArgsEmbed = new MessageEmbed()
      .setTitle("Une erreur est survenue")
      .setColor("#ff4141")
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);

    if (command.config.usage)
      noArgsEmbed.setDescription(
        `● Vous devez mettre un/des argument(s) pour utiliser cette commande \n ● \`${prefix}${command.config.name} ${command.config.usage}\``
      );
    return message.channel.send(noArgsEmbed);
  }

  // Lancement de la commande
  command.run(bot, message, args);
};
