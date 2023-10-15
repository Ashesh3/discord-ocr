const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const https = require("https");
const Tesseract = require("tesseract.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  restRequestTimeout: 30000,
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function attachIsImage(msgAttach) {
  let contentType = msgAttach.contentType;
  return contentType.includes("image");
}

let channels = {
  "SOURCE_CHANNEL_ID": "DEST_CHANNEL_ID",
};

client.on("messageCreate", (message) => {
  (async () => {
    if (!Object.keys(channels).includes(message.channel.id)) return;
    if (message.reference) {
      let parent_msg = await message.channel.messages.fetch(
        message.reference.messageID
      );
      if (parent_msg.attachments.size > 0) {
        await parent_msg.react("✅");
      }
    }
    if (message.attachments.size > 0) {
      let currentTime = new Date();
      let currentOffset = currentTime.getTimezoneOffset();
      let ISTOffset = 330;
      let ISTTime = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000
      );
      if (message.attachments.every(attachIsImage)) {
        await message.react("🔍");
        https.get(message.attachments.first().url, function (response) {
          let data = [];
          response.on("data", (chunk) => data.push(chunk));
          response.on("end", async () => {
            let buffer = Buffer.concat(data);
            Tesseract.recognize(buffer).then((result) => {
              let ocr_res = result.data.text;
              console.log(ocr_res);
              client.channels.cache.get(channels[message.channel.id]).send({
                embeds: [
                  new EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Original Message")
                    .setURL(
                      `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
                    )
                    .setDescription(ocr_res)
                    .setFooter({
                      text: "Generated at " + ISTTime.toLocaleString(),
                    }),
                ],
              });
            });
          });
        });
      }
    }
  })();
});

client.login("BOT_TOKEN");
