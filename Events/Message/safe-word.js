const { Message, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const SafeWordDB = require("../../Structures/Schemas/SafeWordDB")

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { content, guild } = message
        const { emojilist } = client

        const data = await SafeWordDB.findOne({ Guild: guild.id }).catch(err => { })
        if (!data) return

        if (content.includes(`${data.SafeWord}`)) {

            const Embed = new EmbedBuilder()
                .setColor("0xffc0cb")
                .setTitle(`Safe Word | ${emojilist.cross}`)
                .setDescription("The safe word has been spoken! Please change the subject of the conversation and an admin will be here shortly to handle the situation.")
                .setFooter({ text: "Safe Word by Bun Bot" })
                .setTimestamp()

            message.reply({ content: `${data.Role}`, embeds: [ Embed ] }).then(msg => { message.delete() })

        }

    }

}