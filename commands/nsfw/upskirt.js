const Util = require('../../util/MitUtil.js');
const request = require("request");
const { nonsfw } = require("../../util messages/nsfw");
let subreddit = ["Upskirt"];

module.exports = {
    name: 'upskirt',
    description: "Sends a random picture of a upskirt moment",
    aliases: ['skirt'],
    usage: '',
    cooldown: 2,
    args: 0,
    catergory: 'NSFW',
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
