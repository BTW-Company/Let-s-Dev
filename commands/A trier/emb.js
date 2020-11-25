const { MessageEmbed } = require("discord.js");
const { Menu } = require("discord.js-menu");

const funct = require("../../utils/functions.js");

module.exports.run = async (bot, message, args) => {
  // Emojis
  const checkEmoji = bot.emojis.cache.get("780089944404131860");
  const crossEmoji = bot.emojis.cache.get("780089943853891584");
  const plusEmoji = bot.emojis.cache.get("780896502792323073");
  const plusNeutreEmoji = bot.emojis.cache.get("781152691836551188");
  // Pyro
  const pyroOneEmoji = bot.emojis.cache.get(bot.main.ROLES.PYRO.EMOJI.PART1);
  const pyroTwoEmoji = bot.emojis.cache.get(bot.main.ROLES.PYRO.EMOJI.PART2);
  // Geo
  const geoOneEmoji = bot.emojis.cache.get(bot.main.ROLES.GEO.EMOJI.PART1);
  const geoTwoEmoji = bot.emojis.cache.get(bot.main.ROLES.GEO.EMOJI.PART2);
  // Dendro
  const dendroOneEmoji = bot.emojis.cache.get(
    bot.main.ROLES.DENDRO.EMOJI.PART1
  );
  const dendroTwoEmoji = bot.emojis.cache.get(
    bot.main.ROLES.DENDRO.EMOJI.PART2
  );
  // Anemo
  const anemoOneEmoji = bot.emojis.cache.get(bot.main.ROLES.ANEMO.EMOJI.PART1);
  const anemoTwoEmoji = bot.emojis.cache.get(bot.main.ROLES.ANEMO.EMOJI.PART2);
  // Hydro
  const hydroOneEmoji = bot.emojis.cache.get(bot.main.ROLES.HYDRO.EMOJI.PART1);
  const hydroTwoEmoji = bot.emojis.cache.get(bot.main.ROLES.HYDRO.EMOJI.PART2);
  // Cryo
  const cryoOneEmoji = bot.emojis.cache.get(bot.main.ROLES.CRYO.EMOJI.PART1);
  const cryoTwoEmoji = bot.emojis.cache.get(bot.main.ROLES.CRYO.EMOJI.PART2);
  // Electro
  const electroOneEmoji = bot.emojis.cache.get(
    bot.main.ROLES.ELECTRO.EMOJI.PART1
  );
  const electroTwoEmoji = bot.emojis.cache.get(
    bot.main.ROLES.ELECTRO.EMOJI.PART2
  );

  // Provide a menu with a channel, an author ID to let control the menu, and an array of menu pages.
  let quest = new Menu(
    message.channel,
    message.author.id && "279351779693428736",
    [
      // Pyro
      {
        name: "pyro",

        content: new MessageEmbed({
          title: `Quête numéro 1 - ${pyroOneEmoji}${pyroTwoEmoji}`,
          description: `**Description :**
          Inserer description
          **Prérequis :**
          ${crossEmoji} Level 0/2 [MEE6](https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md "Wiki MEE6") ou ${crossEmoji} 0/1 heure de vocal
          ${checkEmoji} Choisir ses rôles de [notifications](https://discord.com/channels/757994644113064098/764849362672287754/780897724723757096 "Rôles de notifs")
          **Avantages :**
          ${plusEmoji} Le rôle <@&764849301666398229>
          ${plusEmoji} Vidéo & Stream`,

          timestamp: new Date(),
          footer: {
            text: `Commande exécutée par ${message.author.tag}`,
          },
        }),
        reactions: {
          "⏹": "delete",
          "▶️": "geo",
          "➡️": "last",
        },
      },
      // Geo
      {
        name: "geo",

        content: new MessageEmbed({
          title: `Quête numéro 2 - ${geoOneEmoji}${geoTwoEmoji}`,
          description: `**Description :**
          Inserer description
          **Prérequis :**
          ${crossEmoji} Level 0/2 [MEE6](https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md "Wiki MEE6") ou ${crossEmoji} 0/1 heure de vocal
          ${checkEmoji} Choisir ses rôles de [notifications](https://discord.com/channels/757994644113064098/764849362672287754/780897724723757096 "Rôles de notifs")
          **Avantages :**
          ${plusEmoji} Le rôle <@&764849301095448628>
          ${plusEmoji} Ajouter des réactions
          ${plusEmoji} Salons personnalisés
          **Avantages cumulés :**
          ${plusNeutreEmoji} Vidéo & Stream`,

          timestamp: new Date(),
          footer: {
            text: `Commande exécutée par ${message.author.tag}`,
          },
        }),
        reactions: {
          "⬅️": "first",
          "◀️": "pyro",
          "⏹": "delete",
          "▶️": "dendro",
          "➡️": "last",
        },
      },
      // Dendro
      {
        name: "dendro",

        content: new MessageEmbed({
          title: `Quête numéro 3 - ${dendroOneEmoji}${dendroTwoEmoji}`,
          description: `**Description :**
          Inserer description
          **Prérequis :**
          ${crossEmoji} Level 0/2 [MEE6](https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md "Wiki MEE6") ou ${crossEmoji} 0/1 heure de vocal
          ${checkEmoji} Choisir ses rôles de [notifications](https://discord.com/channels/757994644113064098/764849362672287754/780897724723757096 "Rôles de notifs")
          **Avantages :**
          ${plusEmoji} Le rôle <@&764849300303249429>
          ${plusEmoji} Emojis externes
          ${plusEmoji} Changer son pseudo
          **Avantages cumulés :**
          ${plusNeutreEmoji} Vidéo & Stream
          ${plusNeutreEmoji} Ajouter des réactions
          ${plusNeutreEmoji} Salons personnalisés`,

          timestamp: new Date(),
          footer: {
            text: `Commande exécutée par ${message.author.tag}`,
          },
        }),
        reactions: {
          "⬅️": "first",
          "◀️": "geo",
          "⏹": "delete",
          "▶️": "anemo",
          "➡️": "last",
        },
      },
      // Anemo
      {
        name: "anemo",

        content: new MessageEmbed({
          title: `Quête numéro 4 - ${anemoOneEmoji}${anemoTwoEmoji}`,
          description: `**Description :**
          Inserer description
          **Prérequis :**
          ${crossEmoji} Level 0/2 [MEE6](https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md "Wiki MEE6") ou ${crossEmoji} 0/1 heure de vocal
          ${checkEmoji} Choisir ses rôles de [notifications](https://discord.com/channels/757994644113064098/764849362672287754/780897724723757096 "Rôles de notifs")
          **Avantages :**
          ${plusEmoji} Le rôle <@&764849299636355096>
          ${plusEmoji} Ajouter des fichiers
          **Avantages cumulés :**
          ${plusNeutreEmoji} Vidéo & Stream
          ${plusNeutreEmoji} Ajouter des réactions
          ${plusNeutreEmoji} Salons personnalisés
          ${plusNeutreEmoji} Emojis externes
          ${plusNeutreEmoji} Changer son pseudo`,

          timestamp: new Date(),
          footer: {
            text: `Commande exécutée par ${message.author.tag}`,
          },
        }),
        reactions: {
          "⬅️": "first",
          "◀️": "dendro",
          "⏹": "delete",
          "▶️": "hydro",
          "➡️": "last",
        },
      },
      // Hydro
      {
        name: "hydro",

        content: new MessageEmbed({
          title: `Quête numéro 5 - ${hydroOneEmoji}${hydroTwoEmoji}`,
          description: `**Description :**
          Inserer description
          **Prérequis :**
          ${crossEmoji} Level 0/2 [MEE6](https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md "Wiki MEE6") ou ${crossEmoji} 0/1 heure de vocal
          ${checkEmoji} Choisir ses rôles de [notifications](https://discord.com/channels/757994644113064098/764849362672287754/780897724723757096 "Rôles de notifs")
          **Avantages :**
          ${plusEmoji} Le rôle <@&764849299171049472>
          ${plusEmoji} Integrer des liens
          **Avantages cumulés :**
          ${plusNeutreEmoji} Vidéo & Stream
          ${plusNeutreEmoji} Ajouter des réactions
          ${plusNeutreEmoji} Salons personnalisés
          ${plusNeutreEmoji} Emojis externes
          ${plusNeutreEmoji} Changer son pseudo
          ${plusNeutreEmoji} Ajouter des fichiers`,

          timestamp: new Date(),
          footer: {
            text: `Commande exécutée par ${message.author.tag}`,
          },
        }),
        reactions: {
          "⬅️": "first",
          "◀️": "anemo",
          "⏹": "delete",
          "▶️": "cryo",
          "➡️": "last",
        },
      },
      // Cryo
      {
        name: "cryo",

        content: new MessageEmbed({
          title: `Quête numéro 6 - ${cryoOneEmoji}${cryoTwoEmoji}`,
          description: `**Description :**
          Inserer description
          **Prérequis :**
          ${crossEmoji} Level 0/2 [MEE6](https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md "Wiki MEE6") ou ${crossEmoji} 0/1 heure de vocal
          ${checkEmoji} Choisir ses rôles de [notifications](https://discord.com/channels/757994644113064098/764849362672287754/780897724723757096 "Rôles de notifs")
          **Avantages :**
          ${plusEmoji} Le rôle <@&764849298545967214>
          ${plusEmoji} Voix prioritaire
          **Avantages cumulés :**
          ${plusNeutreEmoji} Vidéo & Stream
          ${plusNeutreEmoji} Ajouter des réactions
          ${plusNeutreEmoji} Salons personnalisés
          ${plusNeutreEmoji} Emojis externes
          ${plusNeutreEmoji} Changer son pseudo
          ${plusNeutreEmoji} Ajouter des fichiers
          ${plusNeutreEmoji} Integrer des liens`,

          timestamp: new Date(),
          footer: {
            text: `Commande exécutée par ${message.author.tag}`,
          },
        }),
        reactions: {
          "⬅️": "first",
          "◀️": "cryo",
          "⏹": "delete",
          "▶️": "electro",
          "➡️": "last",
        },
      },
      // Electro
      {
        name: "electro",

        content: new MessageEmbed({
          title: `Quête numéro 7 - ${electroOneEmoji}${electroTwoEmoji}`,
          description: `**Description :**
          Inserer description
          **Prérequis :**
          ${crossEmoji} Level 0/2 [MEE6](https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md "Wiki MEE6") ou ${crossEmoji} 0/1 heure de vocal
          ${checkEmoji} Choisir ses rôles de [notifications](https://discord.com/channels/757994644113064098/764849362672287754/780897724723757096 "Rôles de notifs")
          **Avantages :**
          ${plusEmoji} Le rôle <@&764849297379688449>
          ${plusEmoji} Déplacer les membres
          **Avantages cumulés :**
          ${plusNeutreEmoji} Vidéo & Stream
          ${plusNeutreEmoji} Ajouter des réactions
          ${plusNeutreEmoji} Salons personnalisés
          ${plusNeutreEmoji} Emojis externes
          ${plusNeutreEmoji} Changer son pseudo
          ${plusNeutreEmoji} Ajouter des fichiers
          ${plusNeutreEmoji} Integrer des liens
          ${plusNeutreEmoji} Voix prioritaire`,

          timestamp: new Date(),
          footer: {
            text: `Commande exécutée par ${message.author.tag}`,
          },
        }),
        reactions: {
          "⬅️": "first",
          "◀️": "cryo",
          "⏹": "delete",
        },
      },
    ],
    180000
  );

  quest.start();
};

module.exports.config = {
  name: "embed",
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
