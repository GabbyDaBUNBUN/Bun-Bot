const { Message, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
let timeout = null

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { author } = message
        if (author.id !== `302050872383242240`) return

        //Disboard Bump Buddy
        clearTimeout(timeout)

        if (timeout === null) {

            timeout = setTimeout(function () {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Bump Me")
                            .setDescription("Help us by bumping the server! Use: \`/bump\`")
                            .setFooter({ text: "Bump Buddy by Bun Bot" })
                            .setTimestamp()
                    ]
                })
            }, 7200 * 1000)

        }

    }

}