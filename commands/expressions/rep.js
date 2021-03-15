const repModel = require("../../models/rep");

module.exports = {
  name: "reputation",
  aliases: ["rep"],
  description: "Send someone a reputation point!",
  cooldown: 86400,
  async execute(client, message, args) {
    const user = message.mentions.members.first();

    if (!user) {
      message.channel.send("<:sh_reps:816052337189322754> Please mention someone!");
    } else if (user.id === message.author.id) {
      return message.channel.send(
        `<:sh_reps:816052337189322754> You can't rep yourself!`
      );
    }

    const repDoc = await repModel.findOne({
      guildID: message.guild.id,
      memberID: user.id,
    });

    if (!repDoc) {
      const newUser = new repModel({
        guildID: message.guild.id,
        memberID: user.id,
        reps: 1,
      });

      await newUser
        .save()
        .catch((e) => console.log(`Failed to save new user.`));
    } else {
      repDoc.reps += 1;

      await repDoc
        .save()
        .catch((e) => console.log(`Failed to rep a member: ${e}`));
    }
    message.channel.send(
      `<:sh_reps:816052337189322754> ${message.author} sent a reputation point to <@${user.id}>`
    );
  },
};
