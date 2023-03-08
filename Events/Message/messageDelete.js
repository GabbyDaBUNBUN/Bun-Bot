const { Message, Events, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CountingDB = require("../../Structures/Schemas/CountingDB")

module.exports = {
    name: Events.MessageDelete,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { id, guild, member, channel } = message
        const { color } = client

        //Deleted Count
        let data = await CountingDB.findOne({ Guild: guild.id }).catch(err => { })

        if (!data) return

        if (data.LastMessageId === id) {
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle("Deleted Message")
                        .setDescription(`<@${member.id}> has deleted their count of ${data.Count}`)
                        .setFooter({ text: `Counting by Bun Bot.` })
                        .setTimestamp()
                ]
            })
        }

    }

}