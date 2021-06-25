module.exports = async (oldState, newState) => {
  let oldUserChannel = oldState.channelID;
  let newUserChannel = newState.channelID;

  if(newState.member.bot) return;
};