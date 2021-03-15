
module.exports = {
    name: 'bot-suggest',
    description: 'Sends a suggestion directly to the devs',
    cooldown: 15,
    async execute(client, message, args) {
      try {
        let Message = `**Server Name: ** ${message.guild.name}\n**Author Name:** ${message.author.tag}\n**Suggestion:** ${args.join(" ")}`;
        client.channels.cache.get('814969674608410704').send({
          embed: {
            title: "Suggestion",
            description: Message,
            color: "#FF2C4B",
            footer: {
              text: "Sent by " + message.author.tag,
              icon_url: message.author.displayAvatarURL()
            },
            timestamp: new Date()
          }
        });
  
        return message.channel.send('The suggestion has been sent! thanks ;)');
      } catch (err) {
        console.log(err);
        return message.reply(`Oh no, an error occurred. Try again later!`);
      }
    }
  };
  