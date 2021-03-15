const Util = require('../../util/MitUtil.js');
const DabiImages = require("dabi-images");
const DabiClient = new DabiImages.Client();
const { nonsfw } = require("../../util messages/nsfw");
module.exports = {
    name: 'panties',
    description: "Sends a random panty related images",
    aliases: ['panty', 'underwear'],
    usage: '',
    cooldown: 2,
    args: 0,
    catergory: 'NSFW',
    async execute(client, message, args) {
       
                
                 if (!message.channel.nsfw) {
                return nonsfw(message);
                  }

            
                await DabiClient.nsfw.real.panties().then(json => {
                    return message.channel.send({
                        embed: {
                            title: "<:sh_thinking:818158906824065024>",
                            image: {
                                url: json.url,
                            },
                            color: "#FF2C4B",
                        
                        }
                    });
                    // outputs data with image url, possible source and other stuff
                }).catch(error => {
                    console.log(error);
                    return message.reply("Uknown error, please try again");
                    // outputs error
                });

           
        } 

};
