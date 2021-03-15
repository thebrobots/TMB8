module.exports = (client) => {
  const muteModel = require("../models/mute");

  setInterval(async () => {
    for (const guild of client.guilds.cache) {
      const muteArray = await muteModel.find({
        guildID: guild[0],
      });

      for (const muteDoc of muteArray) {
        if (Date.now() >= Number(muteDoc.lenght)) {
          const guild = client.guilds.cache.get(muteDoc.guildID);
          const member = guild
            ? guild.members.cache.get(muteDoc.memberID)
            : null;
          const muteRole = guild
            ? guild.roles.cache.find((r) => r.name == "Muted")
            : null;

          if (member) {
            await member.roles
              .remove(muteRole ? muteRole.id : "")
              .catch((err) => console.log(err));
            for (const role of muteDoc.memberRoles) {
              await member.roles.add(role).catch((err) => console.log(err));
            }
          }

          await muteDoc.deleteOne().catch((err) => console.log(err));
        }
      }
    }
  }, 60000);

  client.on("guildMemberAdd", async (member) => {
    const muteDoc = await muteModel.findOne({
      guildID: member.guild.id,
      memberID: member.id,
    });

    if (muteDoc) {
      const muteRole = member.guild.roles.cache.find((r) => r.name == "Muted");

      if (muteRole)
        member.roles.add(muteRole.id).catch((err) => console.log(err));

      muteDoc.memberRoles = [];

      await muteDoc.save().catch((err) => console.log(err));
    }
  });
};
