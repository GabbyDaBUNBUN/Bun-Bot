const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient");
const Reply = require("../../Systems/Reply");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Set the volume of the song playing.")
        .addIntegerOption(opt => opt.setName("number").setDescription("The volume 1-100 that you want the song to play at.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, member, guild } = interaction;
        const { emojilist, distube, color } = client
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return Reply(interaction, emojilist.cross, `You must be in a vc to use this command!`)
        if (!member.voice.channelId == guild.members.me.voice.channelId) return Reply(interaction, emojilist.cross, `I am already being used in another channel, you must be in the same channel as me to use this command!`)

        try {

            const volume = options.getInteger("number")
            if (volume > 100 || volume < 1) return Reply(interaction, emojilist.cross, `The number must be between 1-100!`)
            distube.setVolume(voiceChannel, volume)
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle("Play")
                        .setDescription(`Volume is now set to **${volume}**`)
                        .setFooter({ text: "Music by Bun Bot" })
                        .setTimestamp()
                ]
            })

        } catch (error) {
            Reply(interaction, emojilist.cross, `Alert!: ${error}`)
        }

    }
}