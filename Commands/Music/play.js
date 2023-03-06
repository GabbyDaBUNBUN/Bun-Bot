const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song.")
        .addStringOption(opt => opt.setName("song").setDescription("The name or link of a song.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, channel, member, guild } = interaction;
        const { emojilist, distube, color } = client
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return Reply(interaction, emojilist.cross, `You must be in a vc to use this command!`)
        if (!member.voice.channelId == guild.members.me.voice.channelId) return Reply(interaction, emojilist.cross, `I am already being used in another channel, you must be in the same channel as me to use this command!`)

        try {

            const song = options.getString("song")
            distube.play(voiceChannel, song, { textChannel: channel, member: member })
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle("Play")
                        .setDescription("Request has been recieved!")
                        .setFooter({ text: "Music by Bun Bot" })
                        .setTimestamp()
                ]
            })

        } catch (error) {
            Reply(interaction, emojilist.cross, `Alert!: ${error}`)
        }

    }
}