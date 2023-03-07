const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const ConfessionDB = require("../../Structures/Schemas/ConfessionDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("confess")
        .setDescription("Send your confession anonymously.")
        .addStringOption(opt => opt.setName("confession").setDescription("What you want to confess.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild, member } = interaction
        const { emojilist, color } = client
        const confession = options.getString("confession")
        const data = await ConfessionDB.findOne({ Guild: guild.id }).catch(err => { })
        if (!data) return Reply(interaction, emojilist.cross, `There is no confession channel set up yet!`, true)
        const channel = guild.channels.cache.get(data.Channel)
        const count = data.Count
        if (count > 999) {
            data.Count = 0
            data.save
        }

        Reply(interaction, emojilist.timer, `Your confession ${confession} has been sent!`, true)

        if (!data.LogChannel) {

            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Confession ${count}`)
                        .setDescription(`${confession}`)
                        .setFooter({ text: "Confessions by Bun Bot" })
                        .setTimestamp()
                ]
            })

            data.Count = data.Count + 1
            await data.save()

        } else {

            const logChannel = guild.channels.cache.get(data.LogChannel)
            const description = `User: ${member.user.username}\nUser ID: ${member.id}\nConfession: ${confession}\nConfession Number: ${data.Count}`

            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Confession ${count}`)
                        .setDescription(`${confession}`)
                        .setFooter({ text: "Confessions by Bun Bot" })
                        .setTimestamp()
                ]
            })

            logChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle("Confession Log")
                        .setDescription(`${description}`)
                        .setFooter({ text: "Confessions by Bun Bot" })
                        .setTimestamp()
                ]
            })

            data.Count = data.Count + 1
            await data.save()

        }

    }
}