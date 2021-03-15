const client = require("nekos.life");
const neko = new client();

module.exports = {
  name: "cattext",
  aliases: ["catext"],
  Description: "Sends a cat (literaly)",

  async execute(client, message, args) {

    l
    async function work() {
      let owo = await neko.sfw.catText();
      message.channel.send(owo.cat).catch((error) => {
        console.error(error);
      });
    }

    work();
  },
};
