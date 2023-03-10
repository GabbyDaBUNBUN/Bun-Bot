const { Message, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { author } = message
        const { color } = client
        if (author.id !== `302050872383242240`) return

        //Disboard Bump Buddy
        const sleep = async (ms) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, ms || 0);
            });
        };

        message.react(`⌚`)

        await sleep(7200000)

        message.reply({
            components: `<@&1042275026616983654>`,
            embeds: [
                new EmbedBuilder()
                    .setColor(color)
                    .setTitle("Bump Me")
                    .setDescription("Help us by bumping the server! Use: \`/bump\`")
                    .setFooter({ text: "Bump Buddy by Bun Bot" })
                    .setTimestamp()
            ]
        })

    }

}