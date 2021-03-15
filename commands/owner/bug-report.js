
module.exports = {
    name: 'bug-report',
    description: 'Sends a bug report directly to the devs',
    cooldown: 15, 
    async execute(client, message, args) {
      try {
        let Message = `**Server Name: ** ${message.guild.name}\n**Author Name:** ${message.author.tag}\n**Bug:** ${args.join(" ")}`;
        client.channels.cache.get('814969700861739059').send({
          embed: {
            title: "Bug report",
            description: Message,
            color: "#FF2C4B",
            footer: {
              text: "Reported by " + message.author.tag,
              icon_url: message.author.displayAvatarURL()
            },
            timestamp: new Date()
          }
        });
  
        return message.channel.send('The report has been sent! thanks ;)');
      } catch (err) {
        console.log(err);
        return message.reply(`Oh no, an error occurred. Try again later!`);
      }
    }
  };
  