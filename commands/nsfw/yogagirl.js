const Util = require('../../util/MitUtil.js');
const request = require("request");
const { nonsfw } = require("../../util messages/nsfw");
let subreddit = ["girlsinyogapants"];

module.exports = {
    name: 'yogagirl',
    description: "Sends a random picture of a women in yoga pants",
    aliases: ['yogapants', 'yoga'],
    cooldown: 5,

    async execute(client, message, args) {
        try {
            
             if (!message.channel.nsfw) {
            return nonsfw(message);
    }
             else {
                Util.subredditimage(subreddit, message);
            }
        } catch (err) {
            console.log(err);
            return message.reply(`Oh no, an error occurred. Try again later!`);
        }
    }
};
