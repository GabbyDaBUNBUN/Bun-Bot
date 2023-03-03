const { Message, Events, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CountingDB = require("../../Structures/Schemas/CountingDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: Events.MessageDelete,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { id, guild, member, channel } = message
        const { emojilist, color } = client

        let data = await CountingDB.findOne({ Guild: guild.id }).catch(err => { })

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Deleted Message")
            .setDescription(`<@${member.id}> has deleted their count of ${data.Count}`)
            .setFooter({ text: `Counting by Bun Bot.` })
            .setTimestamp()

        if (!data) return

        if (data.LastMessageId === id) {
            channel.send({ embeds: [ Embed ] })
        }

    }

}