module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Show the bot's average ping",
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  execute(client, message, args) {
    message.channel
      .send(
        `**Pong!**
    
    <:sh_ping:799392394566696971> **Ping:** ${Math.round(
      message.client.ws.ping
    )} ms`
      )
      .catch(console.error);
  },
};
