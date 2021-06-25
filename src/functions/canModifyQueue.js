exports.canModifyQueue = (member) => {
  const { channelID } = member.voice;
  const botChannel = member.guild.voice.channelID;

  if (channelID !== botChannel) {
    member
      .send(
        `<:sh_bot:799392372009467935> You must be in the same channel as ${message.client.user}`
      )
      .catch(console.error);
    return;
  }

  return true;
};
