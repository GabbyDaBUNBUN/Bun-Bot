const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { channel, member, guild } = interaction;
        const { emojilist, distube, color } = client
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return Reply(interaction, emojilist.cross, `You must be in a vc to use this command!`)
        if (guild.client.voice.channel.id && voiceChannel.id !== guild.client.voice.channel.id) return Reply(interaction, emojilist.cross, `I am already being used in another channel, you must be in the same channel as me to use this command!`)
        const queue = distube.getQueue(voiceChannel)
        if (!queue) return Reply(interaction, emojilist.cross, `There are no songs in the queue at this time!`)

        try {
            distube.skip(voiceChannel);
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Skip`)
                        .setDescription(`Skipped the track!`)
                        .setFooter({ text: "Music by Bun Bot" })
                        .setTimestamp()
                ]
            });
        } catch (error) {
            Reply(interaction, emojilist.cross, `Alert!: ${error}`)
        }

    }
}