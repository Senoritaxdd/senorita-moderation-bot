const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client.on("ready", async () => {
  let sesliKanalID = client.channels.cache.get(""); //BOTUN BAĞLANACAĞI SES KANALI ID
  if (sesliKanalID)
    sesliKanalID.join()
      .catch(err => console.error("Bot ses kanalina baglanamadi!"));
});

client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));

