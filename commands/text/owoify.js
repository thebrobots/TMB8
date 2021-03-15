const client = require("nekos.life");
const neko = new client();

module.exports = {
  name: "owoify",
  Description: "Owoify a text!",

  async execute(client, message, args) {
    async function work() {
      let coolusertext = args.join(" ");
      if (!coolusertext)
        return message.channel.send("Please type some text to owoify.");
      if (coolusertext.length > 200)
        return message.channel.send(
          `I can't owoify a text larger than 200 characters!`
        );

      let owo = await neko.sfw.OwOify({ text: coolusertext });
      message.channel.send(owo.owo).catch((error) => {
        console.error(error);
      });
    }

    work();
  },
};
