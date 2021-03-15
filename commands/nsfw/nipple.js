const Util = require('../../util/MitUtil.js');
const request = require("request");
const { nonsfw } = require("../../util messages/nsfw");
let subreddit = [
    'Nipples',
    'Puffies',
    'areolas',
    'SmallNipples',
    'bigareolas'
];

module.exports = {
    name: 'nipple',
    description: "Sends a random picture of nipples",
    aliases: ['nipples', 'nip', 'nips'],
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
