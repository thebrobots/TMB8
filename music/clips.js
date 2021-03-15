const fs = require("fs");

module.exports = {
  name: "soundboard",
  description: "List all sounds",
  execute(message) {
    fs.readdir("./sounds", function(err, files) {
      if (err) return console.log("Unable to read directory: " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });

      message.channel.send(`${clips.join(` ` ` `)}`).catch(console.error);
    });
  }
};
