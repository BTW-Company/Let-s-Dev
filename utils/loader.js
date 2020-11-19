const { readdirSync } = require("fs");
const colors = require("colors");

const loadCommands = (client, dir = "./commands") => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.config.name, getFileName);
      console.log(
        colors.cyan(`Commande chargée : `) + `${getFileName.config.name}`
      );
    }
  });
};

const loadEvents = (client, dir = "./events") => {
  readdirSync(dir).forEach((dirs) => {
    const events = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(colors.red(`Evenement chargé : `) + `${evtName}`);
    }
  });
};

module.exports = {
  loadCommands,
  loadEvents,
};
